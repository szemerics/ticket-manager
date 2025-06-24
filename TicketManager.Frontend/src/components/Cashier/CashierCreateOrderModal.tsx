import {
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Select,
  Stepper,
  Text,
  TextInput,
  Card,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IMovie } from '../../interfaces/IMovie';
import { IScreening } from '../../interfaces/IScreening';
import { ISetting } from '../../interfaces/ISetting';

interface CashierCreateOrderModalProps {
  onOrderCreated?: () => void;
}

const CashierCreateOrderModal = ({ onOrderCreated }: CashierCreateOrderModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<IScreening | null>(null);

  const [settings, setSettings] = useState<ISetting[]>([]);
  const [ticketSelections, setTicketSelections] = useState([{ type: '', count: 1 }]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch movies and settings on open
  useEffect(() => {
    if (opened) {
      api.Movies.getMovies().then(res => setMovies(res.data));
      api.Settings.getSettings().then(res => setSettings(res.data));
      setActive(0);
      setSelectedMovieId(null);
      setScreenings([]);
      setSelectedScreening(null);
      setTicketSelections([{ type: '', count: 1 }]);
      setSelectedSeats([]);
      setError(null);
      setSuccess(false);
    }
  }, [opened]);

  useEffect(() => {
    if (selectedMovieId) {
      api.Screenings.getScreeningsByMovieId(selectedMovieId).then(res => {
        // Only future screenings
        const now = new Date();
        setScreenings(res.data.filter(s => new Date(s.screeningTime) > now));
      });
    } else {
      setScreenings([]);
    }
    setSelectedScreening(null);
  }, [selectedMovieId]);

  // Ticket types
  const TicketTypes = settings
    .filter(s => s.key.includes('TicketDiscount'))
    .map(setting => ({
      value: setting.key,
      label: setting.key.replace('TicketDiscount', '')
    }));

  // Default ticket type
  useEffect(() => {
    if (TicketTypes.length > 0 && ticketSelections.length === 1 && !ticketSelections[0].type) {
      setTicketSelections([{ type: TicketTypes[TicketTypes.length - 1].value, count: 1 }]);
    }
  }, [settings]);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // Order submit
  const handleOrder = async () => {
    setError(null);
    setSuccess(false);
    if (!selectedScreening) return;
    if (selectedSeats.length !== ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0)) {
      setError('Please select the same number of seats as tickets.');
      return;
    }
    const typeMap = Object.fromEntries(settings.map(s => [s.key, s.id]));
    const tickets: { type: number, seatId: number }[] = [];
    let seatIdx = 0;
    for (const sel of ticketSelections) {
      const typeId = typeMap[sel.type];
      for (let i = 0; i < sel.count; ++i) {
        tickets.push({ type: typeId, seatId: selectedSeats[seatIdx++] });
      }
    }
    const orderPayload = {
      screeningId: selectedScreening.id,
      tickets
    };
    setLoading(true);
    try {
      await api.Orders.createOrderByCashier(orderPayload);
      setSuccess(true);
      notifications.show({
        title: 'Order successful',
        message: 'The order was successful!',
        color: 'green',
        position: 'bottom-center'
      });
      onOrderCreated?.();
      close();
    } catch (e) {
      setError('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="New In-Person Ticket Order" size="xxl">
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Movie" description="Select a movie">
            <Select
              label="Movie"
              placeholder="Select a movie"
              data={movies.map(m => ({ value: m.id.toString(), label: m.title }))}
              value={selectedMovieId}
              onChange={setSelectedMovieId}
              required
            />
            <Group justify="flex-end" mt="md">
              <Button onClick={nextStep} disabled={!selectedMovieId}>Next</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Screening" description="Select a screening">
            <Flex direction="column" gap={10}>
              {screenings.length === 0 && <Text>No screenings available for this movie.</Text>}
              {screenings.map(screening => (
                <Card key={screening.id} shadow="sm" padding="md" mb={10} style={{ backgroundColor: selectedScreening?.id === screening.id ? '#e7f5ff' : '#fff' }}>
                  <Text><b>Time:</b> {new Date(screening.screeningTime).toLocaleString()}</Text>
                  <Text><b>Room:</b> {screening.roomName}</Text>
                  <Button mt={10} onClick={() => setSelectedScreening(screening)} variant={selectedScreening?.id === screening.id ? 'filled' : 'light'}>Select</Button>
                </Card>
              ))}
            </Flex>
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep} disabled={!selectedScreening}>Next</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Tickets & Seats" description="Select ticket types and seats">
            <Flex direction="column" gap={10}>
              {ticketSelections.map((ticketSelection, idx) => {
                const usedTypes = ticketSelections.map(s => s.type).filter(Boolean);
                const availableTypes = TicketTypes.filter(t => !usedTypes.includes(t.value) || t.value === ticketSelection.type);
                return (
                  <Group key={idx}>
                    <Select
                      label="Ticket type"
                      data={availableTypes}
                      value={ticketSelection.type}
                      onChange={value => {
                        setTicketSelections(selections => selections.map((s, i) => i === idx ? { ...s, type: value || '' } : s));
                      }}
                    />
                    <NumberInput
                      label="Count"
                      min={1}
                      max={10}
                      w={100}
                      value={ticketSelection.count}
                      onChange={val => setTicketSelections(selections => selections.map((s, i) => i === idx ? { ...s, count: Number(val) } : s))}
                    />
                    {ticketSelections.length > 1 && (
                      <Button mt="auto" variant='light' color="red" onClick={() => setTicketSelections(selections => selections.filter((_, i) => i !== idx))}>Remove</Button>
                    )}
                  </Group>
                );
              })}
              {ticketSelections.length < TicketTypes.length && (
                <Button variant='light' mt={10} onClick={() => setTicketSelections(selections => [...selections, { type: '', count: 1 }])}>
                  Add new ticket type
                </Button>
              )}
              {selectedScreening && (
                <Flex direction="column" align="center" gap={20} mt={20}>
                  <Text size="md" fw={700} mb={10}>Select seats</Text>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedScreening.columnNumber}, 40px)`, gap: 8 }}>
                    {Array.from({ length: selectedScreening.rowNumber }).map((_, rowIdx) => (
                      Array.from({ length: selectedScreening.columnNumber }).map((_, colIdx) => {
                        const seat = selectedScreening.seats.find(s => s.row === rowIdx + 1 && s.column === colIdx + 1);
                        const isReserved = seat?.isReserved;
                        const isSelected = seat && selectedSeats.includes(seat.id);
                        const maxSelectable = ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0);
                        const canSelectMore = selectedSeats.length < maxSelectable;
                        return (
                          <button
                            key={`seat-${rowIdx}-${colIdx}`}
                            disabled={isReserved || (!isSelected && !canSelectMore)}
                            onClick={() => {
                              if (!seat) return;
                              setSelectedSeats(seats =>
                                isSelected
                                  ? seats.filter(id => id !== seat.id)
                                  : seats.length < maxSelectable
                                    ? [...seats, seat.id]
                                    : seats
                              );
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 6,
                              fontWeight: 600,
                              fontSize: 14,
                              border: isSelected ? '2px solid #228be6' : '1px solid #ccc',
                              background: isReserved ? '#444' : isSelected ? '#4dabf7' : '#eee',
                              cursor: isReserved ? 'not-allowed' : 'pointer',
                              color: isReserved ? '#fff' : '#222',
                              opacity: isReserved ? 0.7 : 1,
                              transition: 'background 0.2s, border 0.2s',
                            }}
                            title={seat ? `Row ${seat.row}, Seat ${seat.column}` : 'No seat'}
                          >
                            {seat ? `${seat.row}-${seat.column}` : ''}
                          </button>
                        );
                      })
                    ))}
                  </div>
                  <Text mt={10} size="sm">Selected seats: {selectedSeats.length} / {ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0)}</Text>
                </Flex>
              )}
            </Flex>
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep} disabled={selectedSeats.length !== ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0) || ticketSelections.some(sel => !sel.type)}>Next</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Overview" description="Order summary">
            {selectedScreening && (
              <Flex direction="column" gap={16} align="center">
                <Text size="xl" mb={10} fw={700}>Summary</Text>
                <Text><b>Movie:</b> {movies.find(m => m.id === selectedScreening.movieId)?.title}</Text>
                <Text><b>Screening:</b> {new Date(selectedScreening.screeningTime).toLocaleString()} - {selectedScreening.roomName}</Text>
                <Text><b>Tickets:</b></Text>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {ticketSelections.map((sel, idx) => (
                    <li key={idx}>{sel.count} x {sel.type.replace('TicketDiscount', '')}</li>
                  ))}
                </ul>
                <Text><b>Seats:</b></Text>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {selectedSeats.map(seatId => {
                    const seat = selectedScreening.seats.find(s => s.id === seatId);
                    return seat ? <li key={seatId}>Row {seat.row}, Seat {seat.column}</li> : null;
                  })}
                </ul>
                {error && <Text color="red">{error}</Text>}
                {success && <Text color="green">Order successful!</Text>}
                <Button
                  loading={loading}
                  mt={10}
                  onClick={handleOrder}
                  disabled={loading}
                >
                  Finalize order
                </Button>
              </Flex>
            )}
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={prevStep}>Back</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Completed>
            Order successful! Click to close.
          </Stepper.Completed>
        </Stepper>
      </Modal>
      <Button onClick={open} mb={10} leftSection={<IconPlus size={16} />}>New in-person ticket order</Button>
    </>
  );
};

export default CashierCreateOrderModal;