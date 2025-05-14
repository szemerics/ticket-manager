import { Button, Card, Group, MultiSelect, NumberInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";

interface IMovieForm {
  isCreate: boolean
}

const MovieForm = ({isCreate}: IMovieForm) => {
  const { id } = useParams()
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      year: 0,
      description: '',
      lengthInMinutes: 0,
      minimumAge: 0,
      categoryIds: [] as string[],
    },

    validate: {
      title: (value) => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      year: (value) => (value < 1900 || value > new Date().getFullYear() ? 'Year must be between 1900 and current year' : null),
      lengthInMinutes: (value) => (value < 1 ? 'Length in minutes must be greater than 0' : null),
      minimumAge: (value) => (value < 0 ? 'Minimum age must be greater than or equal to 0' : null),
    },
  });

  useEffect(() => {
    api.Movies.getCategories().then(res => {
      setCategories(res.data);
    })
  }, [])

  useEffect(() => {
    if (!isCreate && id) {      
      api.Movies.getMovieById(id).then(res => {
        form.setValues({
          title: res.data.title,
          year: res.data.year,
          description: res.data.description,
          lengthInMinutes: res.data.lengthInMinutes,
          minimumAge: res.data.minimumAge,
          categoryIds: res.data.categories.map((c: number) => c.toString())
        })
      })
    }
  
  }, [id])
  
  

  return (
    <>
      <Card>
         <form onSubmit={form.onSubmit((values) => {
            
            if (isCreate) {
              api.Movies.createMovie({
                title: values.title,
                year: values.year,
                description: values.description,
                lengthInMinutes: values.lengthInMinutes,
                minimumAge: values.minimumAge,
                categories: values.categoryIds.map(c => parseInt(c))
                }).then()
            } else {
              api.Movies.updateMovie(id!, {
                title: values.title,
                year: values.year,
                description: values.description,
                lengthInMinutes: values.lengthInMinutes,
                minimumAge: values.minimumAge,
                categories: values.categoryIds.map(c => parseInt(c))
                }).then()
            }
            
           
          })}>

          <TextInput
            withAsterisk
            label="Title"
            placeholder="Movie Title"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />

          <NumberInput
            withAsterisk
            label="Year"
            min={0}
            clampBehavior="strict"
            key= {form.key('year')}
            {...form.getInputProps('year')}
          />

          <Textarea
            withAsterisk
            label="Description"
            placeholder="Movie Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <NumberInput
            withAsterisk
            label="Length"
            description="Movie length in minutes"
            min={0}
            clampBehavior="strict"
            key= {form.key('lengthInMinutes')}
            {...form.getInputProps('lengthInMinutes')}
          />

          <NumberInput
            withAsterisk
            label="Minimum Age"
            min={0}
            clampBehavior="strict"
            key= {form.key('minimumAge')}
            {...form.getInputProps('minimumAge')}
          />

          <MultiSelect
            withAsterisk
            label="Movie Categories"
            placeholder="Pick multiple categories"
            data={categories.map(c => ({
              label: c.name,
              value: c.id.toString()
            }))}
            searchable
            key= {form.key('categoryIds')}
            {...form.getInputProps('categoryIds')}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Card>
     
    </>
  )
}

export default MovieForm