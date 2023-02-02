import dayjs from "dayjs";
import Slideshow from "../components/Slideshow";


export default function Homepage(props) {

  const { eventsList } = props;
  
  const futureDate = dayjs().add(3, "day")

  return (
    <div className="Homepage">
      <Slideshow eventsList={eventsList} untilDate={futureDate}/>
    </div>
  );
}
