import { useEffect, useState } from 'react';
import { Stepper, Button, Group, Container, Text, Card, Flex, Select, NumberInput, TextInput, Modal } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IScreening } from '../interfaces/IScreening';
import api from '../api/api';
import { ISetting } from '../interfaces/ISetting';
import useAuth from '../hooks/useAuth';

const Booking = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const { movieId } = useParams();
  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [settings, setSettings] = useState<ISetting[]>([]);
  const [ticketSelections, setTicketSelections] = useState([{ type: '', count: 1 }]);
  const [selectedScreening, setSelectedScreening] = useState<IScreening | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { isLoggedIn, email: userEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successModalOpened, setSuccessModalOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      api.Screenings.getScreeningsByMovieId(movieId).then(res => {
        // Only future screenings
        const now = new Date();
        setScreenings(res.data.filter(s => new Date(s.screeningTime) > now));
      })
    }

    api.Settings.getSettings().then(res => {
      setSettings(res.data);
    })
  }, [])

  const TicketTypes = settings
    .slice(1)
    .map(setting => ({
      value: setting.key,
      label: setting.key.replace('TicketDiscount', '')
    }))

  useEffect(() => {
    if (TicketTypes.length > 0 && ticketSelections.length === 1 && !ticketSelections[0].type) {
      setTicketSelections([{ type: TicketTypes[TicketTypes.length - 1].value, count: 1 }]);
    }
  }, [settings]);

  const handleBack = () => {
    if (active === 0) {
      window.history.back();
    } else {
      prevStep();
    }
  }
  
  return (
    <>
      <Container mt={50}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="First step" description="Select a Screening">
            <Flex direction={'column'} align={'center'} gap={10}>
              <Text size="xl" mb={10} fw={700}>Select a Screening</Text>
              {screenings.map(screening => (
                <Card miw={500} key={screening.id} shadow="sm" padding="md" mb={10} style={{ backgroundColor: '#fff', border: '1px', borderStyle: 'solid', borderColor: '#f8f9fa' }}>
                  <Text>Time: {new Date(screening.screeningTime).toLocaleString()}</Text>
                  <Text>Room: {screening.roomName}</Text>
                  <Button onClick={() => {
                    setSelectedScreening(screening);
                    nextStep();
                  }}>Select</Button>
                </Card>
              ))}
            </Flex>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select Tickets">
            <Flex justify='center' align={'center'} direction={'column'} gap={10} mb={50}>
              <Text size="xl" mb={10} fw={700}>Select your Tickets</Text>
              {ticketSelections.map((ticketSelection, idx) => {
                const usedTypes = ticketSelections.map(s => s.type).filter(Boolean);
                const availableTypes = TicketTypes.filter(t => !usedTypes.includes(t.value) || t.value === ticketSelection.type);
                return (
                  <Group key={idx}>
                    <Select
                      label="Ticket Type"
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
                  Add new Ticket Type
                </Button>
              )}
            </Flex>
            <Group justify='center' mb={10}>
              <Button 
                onClick={nextStep}
                disabled={ticketSelections.some(sel => !sel.type)}
              >
                Select Seats
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Third Step" description="Select Seats">
            {selectedScreening ? (
              <Flex direction="column" align="center" gap={20}>
                <Text size="xl" fw={700} mb={10}>Select your seats</Text>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedScreening.columnNumber}, 56px)`, gap: 12 }}>
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
                            width: 56,
                            height: 56,
                            borderRadius: 8,
                            fontWeight: 600,
                            fontSize: 18,
                            border: isSelected ? '2px solid #228be6' : '1px solid #ccc',
                            background: isReserved ? '#444' : isSelected ? '#4dabf7' : '#eee',
                            cursor: isReserved ? 'not-allowed' : 'pointer',
                            color: isReserved ? '#fff' : '#222',
                            opacity: isReserved ? 0.7 : 1,
                            transition: 'background 0.2s, border 0.2s',
                          }}
                          title={seat ? `Row ${seat.row}, Col ${seat.column}` : 'No seat'}
                        >
                          {seat ? `${seat.row}-${seat.column}` : ''}
                        </button>
                      );
                    })
                  ))}
                </div>
                <Text mt={10} size="sm">Selected seats: {selectedSeats.length} / {ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0)}</Text>
                  <Button onClick={nextStep}>Next</Button>
              </Flex>
              
            ) : (
              <Text>No screening selected.</Text>
            )}
          </Stepper.Step>
          <Stepper.Step label="Final Step" description="Confirm Booking">
            {selectedScreening && (
              <Flex direction="column" gap={16} align="center">
                <Text size="xl" mb={10} fw={700}>Summary</Text>
                <Text><b>Movie:</b> {selectedScreening.movie.title}</Text>
                <Text><b>Screening:</b> {new Date(selectedScreening.screeningTime).toLocaleString()} - {selectedScreening.roomName}</Text>
                <Text><b>Tickets:</b></Text>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {ticketSelections.map((sel, idx) => (
                    <li key={idx}>{sel.count} x {sel.type}</li>
                  ))}
                </ul>
                <Text><b>Seats:</b></Text>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {selectedSeats.map(seatId => {
                    const seat = selectedScreening.seats.find(s => s.id === seatId);
                    return seat ? <li key={seatId}>Row {seat.row}, Col {seat.column}</li> : null;
                  })}
                </ul>
                {!isLoggedIn && (
                  <>
                    <TextInput
                      label="Email"
                      value={email}
                      onChange={e => setEmail(e.currentTarget.value)}
                      required
                      mt={10}
                    />
                    <TextInput
                      label="Phone"
                      value={phone}
                      onChange={e => setPhone(e.currentTarget.value)}
                      required
                      mt={10}
                    />
                  </>
                )}
                {error && <Text color="red">{error}</Text>}
                {success && <Text color="green">Order successful!</Text>}
                <Button
                  loading={loading}
                  mt={10}
                  onClick={async () => {
                    setError(null);
                    setSuccess(false);
                    if (!selectedScreening) return;
                    if (selectedSeats.length !== ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0)) {
                      setError('Please select the same number of seats as tickets.');
                      return;
                    }
                    if (!isLoggedIn && (!email || !phone)) {
                      setError('Email and phone are required!');
                      return;
                    }
                    // Map ticket type string to type number (settings.id)
                    const typeMap = Object.fromEntries(settings.map(s => [s.key, s.id]));
                    // Flatten tickets: for each selection, count times, assign seat
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
                      if (isLoggedIn) {
                        await api.Orders.createOrder(orderPayload);
                      } else {
                        await api.Orders.createOrderByAnonymus(email, phone, orderPayload);
                      }
                      setSuccess(true);
                      setSuccessModalOpened(true);
                    } catch (e) {
                      setError('Order failed. Please try again.');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading || selectedSeats.length !== ticketSelections.reduce((sum, t) => sum + (Number(t.count) || 0), 0)}
                >
                  Confirm
                </Button>
              </Flex>
            )}
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt={20}>
          <Button variant="default" onClick={handleBack}>Back</Button>
        </Group>
      </Container>
      <Modal 
        opened={successModalOpened} 
        onClose={() => setSuccessModalOpened(false)} 
        title="Booking Successful!" 
        centered 
        closeOnClickOutside={false} 
        closeOnEscape={false} 
        withCloseButton={false}
      >
        <Flex direction="column" gap={16} align="center">
          <Text size="lg" fw={600} color="green">Your booking has been confirmed!</Text>
          <Text>Thank you for your purchase. You will receive a confirmation email shortly.</Text>
          <Button onClick={() => navigate('/app/home')} mt={10}>
            Return to Home
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default Booking