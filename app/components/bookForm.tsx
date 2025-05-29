import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

type BookFormProps = {
  defaultValue?: {
    title: string
    author: string
    year: number
  }
}

export function BookForm({ defaultValue }: BookFormProps) {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>{defaultValue ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form method="post" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={defaultValue?.title || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              type="text"
              required
              defaultValue={defaultValue?.author || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              required
              defaultValue={defaultValue?.year || ""}
            />
          </div>

          <Button type="submit" className="w-full">
            {defaultValue ? "Update Book" : "Create Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
