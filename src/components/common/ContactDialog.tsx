import { useEffect } from 'preact/hooks'
import { useState, useRef } from 'preact/compat'
// import { Transition } from 'vue';
// import { ref, watch, onMounted, reactive, computed } from "vue";
import { t } from "@util/translate";
// import { useStore } from "@nanostores/vue";
import { showContact } from "@src/store";
//import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
//import { useTextareaAutosize } from "@vueuse/core";
import {Loading} from "@components/common/Loading";
//import {Loading} from "@components/common/Loading";
import toastify from "vue3-toastify/dist/index.css";
//import { toast } from "vue3-toastify";
import styles from "./ContactDialog.module.css"

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
// import Popper from "vue3-popper";

import {contact_dialog_html_elt_id} from "./config"

export interface formTypes {
  email: string,
  name: string,
  message: string,
  phone: string,
}


// const { textarea, input } = useTextareaAutosize();
/*
const rules = {
  email: [
    {
      type: "email",
      required: true,
    },
  ],
  name: [
    {
      type: "string",
      required: true,
    },
  ],
  message: [
    {
      type: "string",
      min: 10,
      required: true,
    },
  ],
};
*/

// const topic = ref(null);
// const showPopper = ref(false);


export interface ContactInfos {
  title: string;
  label: string;
  topics: Topic[]
  provider: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Topic {
  name: string;
  label: string;
}
export interface ContactDialogProps {
  contact: ContactInfos
}


export const ContactDialog = (props: any) => {
    // const $show = useStore(showContact);
    const [form, setForm] = useState<formTypes>({ email: "", name: "", message: "", phone: "" });
    const input = useRef(null)
    const loading = { value: false }
    const topicChannel = { value: null }
    const topicEmail = { value: null }
    const [showContact, setShowContact ] = useState<boolean>(false);
    const [showTopics, setShowTopics ] = useState<boolean>(false);
    const [isLoading, setIsLoading ] = useState<boolean>(false);
    const [topic, setTopic ] = useState<Topic>({ name: 'default', label: 'default'})
    const [contact, setContact ] = useState<ContactInfos>({
      title: `Contact`,
      email: `your@email.com`,
      label: `label default`,
      message: `your message`,
      name: `${t(`name`)}`,
      provider: `mailgun`,
      topics: [
        {label: `for fun`, name: `fun`},
        {label:  `for saying hi`, name:  `sayinghi`}],
      phone: '012345678'
    })
    
    const hide = () => {
      setShowContact(false);
    };
    if (props.contact.topics.length === 1) {
      setContact({...contact, topics: [props.contact.topics[0]]});
    }

    const mailData = {
      email: form.email,
      name: form.name,
      topicChannel: topicChannel.value,
      topicEmail: topicEmail.value,
      message: `
        Topic:  ${topic?.name}\r\n
        Name: ${form.name}\r\n
        Phone: ${form.phone}\r\n
        Email: ${form.email}\r\n
        Message: \r\n${form.message}\r\n                           `,
    }
    const toggleTopics = () => {
      console.log("toggleTopics")
    }
    const selectTopic = (selectedTopic: Topic) => {

    }
    const submitContactForm = () => {
      setIsLoading(true);
      console.log("sending message:", props.contact.provider);
    
      if (!!props.contact.provider) {
        fetch(`/api/contact-${props.contact.provider}`, {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: { "Content-Type": "application/json" },
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.status === "ok") {
              //toast.success(t("contact_thanks"));
              form.email = "";
              form.name = "";
              form.phone = "";
              form.message = "";
              // input.value = "";
              hide();
            } else {
              //toast.error(t("contact_error"));
            }
          })
          .catch((e) => {
            console.log("error", e);
            //toast.error(t("contact_error"));
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };
    /*
    useEffect(() => {
        
    })
    */
    return (
        <>
          {//<Transition name="fade">
          // ${showContact ? 'visible' : 'invisible'}
          }
    <div id={`${contact_dialog_html_elt_id}`}
      style={toastify}
      class={`invisible ${styles.dialog} bg-dark-blur z-1000 dialog pointer-events-auto fixed inset-0 grid w-full cursor-pointer place-items-center`}
      onClick={hide}
    >
      <div /*onClick.stop*/ class="container-md relative">
        <div
          class="surface-base dialog__inner dialog-grid relative overflow-hidden rounded-2xl shadow-xl"
        >
          <div class="overflow-hidden md:block">
            { props.image }
          </div>
          <div
            class="hide-scrollbar dialog__content relative overflow-hidden p-8 md:p-14"
          >
            <form onSubmit={submitContactForm} class="grid gap-8">
              <div class="grid gap-4 pb-8">
                <h2 class="title-sm">{ contact?contact.title:`` }</h2>

                { props.content }
              </div>
            
              <div
                class="input-group z-20 w-full"
                /* v-if="contact.topics.length > 1" */
                >
                <button
                    type="button"
                    onClick={toggleTopics}
                    class="select surface-overlay w-full text-left"
                  >
                    { !!topic ? JSON.stringify(topic, null, 4) : "Select" }
                  </button>

                  {showTopics && (
                    <ul>
                      {contact.topics.map((item, index) => {
                        return (
                          <li
                            key={`topic_${index}`}
                            class={`${ topic.label == item.label ? 'bg-dark bg-opacity-10' : ''}`}
                          >
                            <button
                              type="button"
                              class="w-full p-2 text-left hover:bg-dark hover:bg-opacity-10"
                              onClick={() =>{ return false}}>
                              { item.label }
                            </button>
                          </li>
                          )
                      })}
                    </ul>
                    )
                  }
                  <div class={"tooltip-arrow"} data-popper-arrow></div>
              </div>
              <div>
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary"
                  >{ t(topic?topic.name:`default topic`) } *
                </label>
                
              </div>

              <div class="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  class="surface-overlay peer"
                  v-model="form.name"
                  value={contact.name}
                />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary"
                  >{ t("name") } *</label>
              </div>

              <div class="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  class="surface-overlay peer"
                  v-model="form.email"
                  value={contact.email}
                />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary"
                  >{ t("email") } * </label>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  name="phone"
                  placeholder=" "
                  class="surface-overlay peer"
                  v-model="form.phone"
                  value={contact.phone}
                />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary"
                  >{ t("phone") }</label>
              </div>
              <div class="input-group">
                <textarea
                  class="surface-overlay peer"
                  name="message"
                  id=""
                  placeholder=" "
                  cols={30}
                  rows={2}
                  // ref="textarea"
                ></textarea>
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary"
                  >{ t("Message") } *</label>
              </div>
              <div
                class="pointer-events-none right-5 mb-14 flex translate-y-10 justify-end md:sticky md:bottom-0"
              >
                <button
                  class="btn surface-primary pointer-events-auto"
                  type="submit"
                  disabled={!isLoading}
                >
                  { t("submit") }
                </button>
              </div>
              <Loading loading={isLoading} />
            </form>
          </div>
        </div>
          <button
            class="btn btn-icon surface-dark btn-absolute -right-3 -top-3 z-10"
            onClick={hide}
          >
            <slot />
          </button>
        </div>
      </div>
  
          {//</Transition>
          }


        </>
    )
}




{/*
/**
 * One of the many features available in Vue is the watcher function, which allows us to monitor an application state and trigger actions based on these changes.
 */

/*
const setTopic = (data) => {
  console.log(data);
  topic.value = data.label;
  topicEmail.value = data.email;
  topicChannel.value = data.slack_id;
};


const canSubmit = computed(() => {
  return !loading.value && isFinished.value && pass.value && !!topic.value;
});





watch(
  $show,

  (val) => {
    if (val) {
      console.log("show");
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  },
  { immediate: false },
);

watch(
  input,

  (val) => {
    form.message = val;
  },
  { immediate: false },
);
</script>

<style lang="postcss">
.z-1000 {
  z-index: 1000;
}
.dialog-grid {
  @apply grid grid-cols-1;
  @screen md {
    grid-template-columns: 4fr 5fr;
  }
}

.bg-dark-blur {
  @apply bg-dark bg-opacity-50 backdrop-blur-sm;
}

.dialog {
  --popper-theme-padding: 0;
  &__inner {
    max-height: calc(100vh - 2rem);
    overflow-x: hidden;
    overflow-y: auto;
    @screen md {
      height: min(100vh - 2rem, 40rem);
    }
  }

  &__content {
    @screen md {
      max-height: calc(100vh - 2rem);
      height: min(100vh - 2rem, 40rem);
      height: min(100vh - 2rem, 40rem);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}

.input-group {
  @apply relative isolate;
  input,
  textarea,
  .select {
    @apply block w-full rounded-2xl px-3 py-2.5  focus:outline-primary;
  }
  label {
    @apply absolute left-0 top-3 z-10 origin-[0] -translate-y-9  scale-75 transform text-sm  duration-300;
  }
}
</style>
*/}