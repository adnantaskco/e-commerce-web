import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxBasic() {
  return (
    <FieldGroup className="mx-auto">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel htmlFor="terms-checkbox-basic">
         I Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
