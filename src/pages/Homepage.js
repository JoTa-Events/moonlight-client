import dayjs from "dayjs";
import Slideshow from "../components/Slideshow";

import "./pages-css/Homepage.css";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export default function Homepage(props) {
  const { eventsList } = props;

  const futureDate = dayjs().add(3, "day");

  return (
    <div className="Homepage">
      <Slideshow eventsList={eventsList} untilDate={futureDate} />

      <footer>
        <div className="homepage-content">
          <h2>Jonnathan</h2>
          <span>Full-Stack Developer</span>
          <p>Ironhack</p>
          <p>Germany</p>

          <div className="homepage-icon">
            {/* link to linkedin */}
            <a href="https://github.com/Jogopin">
              <IconBrandLinkedin height={30} width={30} />
            </a>

            {/* link to github */}
            <a href="https://github.com/Jogopin">
              <IconBrandGithub height={30} width={30} />
            </a>
          </div>
        </div>

        <div className="homepage-content">
          <h2>Thalita</h2>
          <span>Full-Stack Developer</span>
          <p>Ironhack</p>
          <p>Switzerland</p>

          <div className="homepage-icon">
            {/* link to linkedin */}
            <a href="https://www.linkedin.com/in/thalitadosreis/">
              <IconBrandLinkedin height={30} width={30} />
            </a>

            {/* link to github */}
            <a href="https://github.com/ThalitadosReis">
              <IconBrandGithub height={30} width={30} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
