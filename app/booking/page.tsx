import BookingForm from '../components/BookingForm'
import Calendar from '../components/Calendar'

type Props = {}

const Booking = (props: Props) => {
	return (
		<>
			{/* Booking Form */}
			<BookingForm />
			{/* Calendar */}
			<Calendar />
		</>
	)
}

export default Booking
