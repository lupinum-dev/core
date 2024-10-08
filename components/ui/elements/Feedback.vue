<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField } from '@/components/ui/form'

const isDialogOpen = ref(false)
const selectedEmoji = ref<number | null>(null)

const emojiIcons = [
  'i-bi-hand-thumbs-up-fill',
  'i-bi-hand-thumbs-down-fill',
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
// TODO: Feedback should be sent immediately when clicking the emoji, addtionally, we should submit the form when clicking the submit button
</script>

<template>
  <ClientOnly>
    <div class="not-prose flex h-12 max-w-fit items-center justify-center rounded-full bg-background p-4 shadow-md ring-1 ring-border">
      <div class="flex items-center">
        <p class="text-sm font-normal text-muted-foreground">
          What do you think?
        </p>
        <div class="ml-2 flex space-x-1">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="`Select emoji ${index + 1}`"
            class="flex size-8 items-center justify-center rounded-full hover:scale-110 hover:text-primary focus:outline-none"
            type="button"
            @click="openDialog(index)"
          >
            <Icon :name="icon" class="size-[18px] text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>

    <UiDialog v-model:open="isDialogOpen">
      <UiDialogContent class="sm:max-w-xl">
        <UiDialogHeader>
          <UiDialogTitle class="text-foreground">
            Provide Feedback
          </UiDialogTitle>
          <UiDialogDescription class="text-muted-foreground">
            We appreciate your feedback. Thank you for sharing your thoughts with us.
          </UiDialogDescription>
        </UiDialogHeader>

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
          <FormField v-slot="{ componentField }" name="feedback">
            <UiFormItem>
              <UiFormLabel class="text-foreground">
                Feedback
              </UiFormLabel>
              <UiFormControl>
                <UiTextarea v-bind="componentField" placeholder="Your Feedback" class="border-input bg-background" />
              </UiFormControl>
              <UiFormMessage class="text-destructive" />
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="files">
            <UiFormItem>
              <UiFormLabel class="text-foreground">
                Upload Files
              </UiFormLabel>
              <UiFormControl>
                <UiInput type="file" v-bind="componentField" multiple class="border-input bg-background" />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="shouldContact">
            <UiFormItem class="flex flex-row items-center justify-between rounded-lg border border-border p-4">
              <div class="space-y-0.5">
                <UiFormLabel class="text-base text-foreground">
                  Should we get back to you?
                </UiFormLabel>
              </div>
              <UiFormControl>
                <UiSwitch
                  :checked="value"
                  @update:checked="handleChange"
                />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <div v-if="values.shouldContact" v-auto-animate class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  Name
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" placeholder="Your Name" class="border-input bg-background" />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  Email
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" type="email" placeholder="your@email.com" class="border-input bg-background" />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="telephone">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  Telephone
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" type="tel" placeholder="Your Phone Number" class="border-input bg-background" />
                </UiFormControl>
              </UiFormItem>
            </FormField>
          </div>

          <UiDialogFooter>
            <UiButton type="submit" class="bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Feedback
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </ClientOnly>
</template>
