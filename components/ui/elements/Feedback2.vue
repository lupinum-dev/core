<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const isDialogOpen = ref(false)
const selectedEmoji = ref<number | null>(null)

const emojiIcons = [
  'i-bi-emoji-smile-fill',
  'i-bi-emoji-neutral-fill',
  'i-bi-emoji-frown-fill',
]

const formSchema = toTypedSchema(z.object({
  feedback: z.string().min(1, 'Feedback is required'),
  files: z.array(z.any()).optional(),
  shouldContact: z.boolean().default(false),
  name: z.string().optional(),
  email: z.string().email().optional(),
  telephone: z.string().optional(),
}))

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((_values) => {
  isDialogOpen.value = false
  resetForm()
})

function openDialog(emojiIndex: number) {
  selectedEmoji.value = emojiIndex
  isDialogOpen.value = true
}
</script>

<template>
  <ClientOnly>
    <LibButton variant="outline" size="sm" @click.stop="openDialog(0)">
      <span>Feedback</span>
      <div class="ml-2 flex">
        <button
          v-for="(icon, index) in emojiIcons"
          :key="icon"
          :aria-label="`Select emoji ${index + 1}`"
          class="flex size-6 items-center justify-center rounded-full hover:scale-110 hover:text-primary focus:outline-none"
          type="button"
          @click.stop="openDialog(index)"
        >
          <Icon :name="icon" class="size-[16px] text-muted-foreground" />
        </button>
      </div>
    </LibButton>

    <LibDialog v-model:open="isDialogOpen">
      <LibDialogContent class="sm:max-w-xl">
        <LibDialogHeader>
          <LibDialogTitle class="text-foreground">
            Provide Feedback
          </LibDialogTitle>
          <LibDialogDescription class="text-muted-foreground">
            We appreciate your feedback. Thank you for sharing your thoughts with us.
          </LibDialogDescription>
        </LibDialogHeader>

        <div class="mb-4 flex justify-center space-x-2">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="`Select emoji ${index + 1}`"
            class="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:text-primary"
            :class="[
              selectedEmoji === index ? 'scale-110 text-primary' : 'opacity-50',
            ]"
            type="button"
            @click="selectedEmoji = index"
          >
            <Icon :name="icon" class="size-7" :class="selectedEmoji === index ? 'text-primary' : 'text-muted-foreground'" />
          </button>
        </div>

        <form v-auto-animate class="space-y-4" @submit="onSubmit">
          <LibFormField v-slot="{ componentField }" name="feedback">
            <LibFormItem>
              <LibFormLabel class="text-foreground">
                Feedback
              </LibFormLabel>
              <LibFormControl>
                <LibTextarea v-bind="componentField" placeholder="Your Feedback" class="border-input bg-background" />
              </LibFormControl>
              <LibFormMessage class="text-destructive" />
            </LibFormItem>
          </LibFormField>

          <LibFormField v-slot="{ componentField }" name="files">
            <LibFormItem>
              <LibFormLabel class="text-foreground">
                Upload Files
              </LibFormLabel>
              <LibFormControl>
                <LibInput type="file" v-bind="componentField" multiple class="border-input bg-background" />
              </LibFormControl>
            </LibFormItem>
          </LibFormField>

          <LibFormField v-slot="{ value, handleChange }" name="shouldContact">
            <LibFormItem class="flex flex-row items-center justify-between rounded-lg border border-border p-4">
              <div class="space-y-0.5">
                <LibFormLabel class="text-base text-foreground">
                  Should we get back to you?
                </LibFormLabel>
              </div>
              <LibFormControl>
                <LibSwitch
                  :checked="value"
                  @update:checked="handleChange"
                />
              </LibFormControl>
            </LibFormItem>
          </LibFormField>

          <div v-if="values.shouldContact" v-auto-animate class="space-y-4">
            <LibFormField v-slot="{ componentField }" name="name">
              <LibFormItem>
                <LibFormLabel class="text-foreground">
                  Name
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" placeholder="Your Name" class="border-input bg-background" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>

            <LibFormField v-slot="{ componentField }" name="email">
              <LibFormItem>
                <LibFormLabel class="text-foreground">
                  Email
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" type="email" placeholder="your@email.com" class="border-input bg-background" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>

            <LibFormField v-slot="{ componentField }" name="telephone">
              <LibFormItem>
                <LibFormLabel class="text-foreground">
                  Telephone
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" type="tel" placeholder="Your Phone Number" class="border-input bg-background" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>
          </div>

          <LibDialogFooter>
            <LibButton type="submit" class="bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Feedback
            </LibButton>
          </LibDialogFooter>
        </form>
      </LibDialogContent>
    </LibDialog>
  </ClientOnly>
</template>