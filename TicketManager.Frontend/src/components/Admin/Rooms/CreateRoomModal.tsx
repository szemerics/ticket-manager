import {
  Button,
  Flex,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import api from '../../../api/api.ts';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';


interface CreateRoomModalProps {
  onRoomCreated?: () => void;
}

const CreateRoomModal = ({ onRoomCreated: onRoomCreated }: CreateRoomModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  
  const form = useForm({
    initialValues: {
      name: '',
      rowNumber: 0,
      columnNumber: 0
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      rowNumber: (value) => (value < 0 ? 'Row count must be greater than 0' : null),
      columnNumber: (value) => (value < 0 ? 'Column count must be greater than 0' : null),
    }
  });



  return (
    <>
      <Modal opened={opened} onClose={close} title="Adding New Movie" size="lg">
        {(
          <form
            onSubmit={form.onSubmit((values) => {
              api.Rooms.createRoom({
                name: values.name,
                rowNumber: values.rowNumber,
                columnNumber: values.columnNumber,
              }).then(() => {
                onRoomCreated?.();
                close();
                 notifications.show({
                  title: 'Success',
                  message: 'Room was successfully updated',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update Room',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>
              <TextInput
                label="Room Name"
                placeholder="Input Room name"
                {...form.getInputProps('name')}
                inputWrapperOrder={['label', 'error', 'input']}
              />

              <NumberInput
                label="Row Count"
                placeholder="Input Row count"
                min={0}
                {...form.getInputProps('rowNumber')}
              />

              <NumberInput
                label="Column Coutn"
                placeholder="Input Column count"
                min={0}
                {...form.getInputProps('columnNumber')}
              />
            </Flex>
           

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit">Save</Button>
            </Group>
          </form>
        )}
      </Modal>


      <Button onClick={open} mb={10} leftSection={<IconPlus size={16} />}>Add New Room</Button>
    </>
  )
}

export default CreateRoomModal