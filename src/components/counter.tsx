import { useEffect } from 'preact/hooks'
import { useState, useRef } from 'preact/compat'

export interface CounterProps {
  countTo: number;
  duration: number; // in milliseconds
}
export const Counter = (props: CounterProps) => {
    const [counter, setCounter ] = useState<number>(0)
    // const target = ref(1000); // dont think we need this target should be props.countTo
    const steps = {
        value: 35
    }
    // const delay =  2000 // is this used???

    const startCounting = () => {
            //Make the counter go up to target value, within the duration
            let step = Math.round(props.countTo / (props.duration / steps.value));
            let currentCount = 0;
            let timer = setInterval(() => {
                currentCount += step;
                setCounter(currentCount);
                if (currentCount >= props.countTo) {
                    clearInterval(timer);
                    setCounter(props.countTo);
                }
            }, steps.value);
        }
    useEffect(() => {
        startCounting();
    })
    return (
        <span>
        { counter }
        </span>
    )
}


/*
<script setup>
    import { ref, onMounted } from 'vue';

    const  props = defineProps({
        countTo: {
            type: Number,
            required: true
        }
    });

    const counter = ref(0);
    const target = ref(1000); // dont think we need this target should be props.countTo
    const steps = ref(35)
    const delay =  ref(2000) // is this used???

    const startCounting=()=> {
            //Make the counter go up to target value, within the duration
            let step = Math.round(props.countTo / (duration.value / steps.value));
            l 
            let currentCount = 0;
            let timer = setInterval(() => {
                currentCount += step.value;
                counter.value = currentCount;
                if (currentCount >= props.countTo) {
                    clearInterval(timer);
                    counter.value = props.countTo;
                }
            }, steps.value);
        }

        onMounted(() => {
            startCounting();
        });
 
 
 
</script>

*/