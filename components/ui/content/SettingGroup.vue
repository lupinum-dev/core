<script lang="ts">
// This needs to be in a separate script tag because it uses defineComponent
import { defineComponent } from 'vue'
import { onMounted, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { Toggle } from 'radix-vue'

const SettingGroup = defineComponent({
  props: {
    title: String,
    options: Array,
    modelValue: String,
  },
  emits: ['update'],
  setup(props, { emit }) {
    return () => (
      <div>
        <h4 class="mb-2 font-medium">{props.title}</h4>
        <div class="flex flex-wrap gap-4">
          {props.options.map(option => (
            <Toggle
              key={option.value}
              pressed={props.modelValue === option.value}
              class={`flex h-16 w-24 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-2 transition-all focus-within:shadow-[0_0_0_2px] focus-within:shadow-black hover:bg-gray-50 ${
                props.modelValue === option.value ? 'ring-2 ring-blue-500' : ''
              }`}
              onUpdate:pressed={pressed => pressed && emit('update', option.value)}
            >
              {option.icon
                ? (
                    <Icon icon={option.icon} class={[option.value, 'text-2xl']} />
                  )
                : (
                    <span class={`text-2xl ${option.value}`}>Aa</span>
                  )}
              <span class={`mt-1 text-xs text-gray-500 ${option.value}`}>{option.label}</span>
            </Toggle>
          ))}
        </div>
      </div>
    )
  },
})
</script>
