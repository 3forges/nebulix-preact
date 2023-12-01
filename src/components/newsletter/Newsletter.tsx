import { useState } from 'preact/compat'
import {Loading} from '@components/common/Loading'
import { t } from "@util/translate"
import "vue3-toastify/dist/index.css"


export function NewsLetter(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const message = { value: '' }
  const reactive = (email: any) => {
    return {email: "test@test.tt"}
  }
  const form = reactive({ email: "" })
  const rules = {
    email: [
      {
        type: "email",
        required: true,
      },
    ],
  };

  const useAsyncValidator = (form, rules ) => {
    return { pass: true, isFinished: true, errorFields: { email: '' } }
  }
  const { pass, isFinished, errorFields } = useAsyncValidator(form, rules);
  const canSubmit = (() => {
    return !loading && isFinished && pass;
  });
  
  const submit = () => {
    if (props.type === "mailchimp") {
      setLoading(true);
      fetch("/api/subscribe-mailchimp", {
        method: "POST",
        body: JSON.stringify({ email: form.email }),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.status === "pending") {
            //toast.success(t("newsletter_thanks"));
            form.email = "";
          } else if (data.status === "Member Exists") {
            //toast.info(t("newsletter_already_subscribed"));
            form.email = "";
          } else {
            //toast.error(t("newsletter_error"));
          }
        })
        .catch((e) => {
          message.value = t("newsletter_error");
          //toast.error(t("newsletter_error"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return(
    <>
      <form
        name="newsletter-subscribes"
        class="relative inline-flex items-center gap-4 py-4"
      >
        <input
          type="email"
          placeholder="t('email')"
          v-model="form.email"
          class={`${errorFields?.email?.length ? 'text-warning' : 'text-light'} relative block overflow-hidden rounded-full bg-dark px-5 py-2`}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          class={`${ canSubmit() ? 'surface-primary' : 'surface-base opacity-50'} btn`}
        >
          { t("subscribe") }
        </button>
        <Loading loading={loading} />
      </form>
    </>
)
}
