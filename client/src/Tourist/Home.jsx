import React, { useState } from "react";
import "../Styles/home.css";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/cil_paper-plane.svg";
import icon3 from "../assets/carbon_hotel.svg";
import calender from "../assets/calender.svg";
import antChart from "../assets/ant-design_bar-chart-outlined.svg";
import carbonMap from "../assets/carbon_map.svg";
import gridIcons from "../assets/gridicons_history.svg";
import worldMap from "../assets/world_map_PNG28 2.svg";
import elipse from "../assets/Ellipse 13.svg";
import arrow from "../assets/ic_round-navigate-next.svg";
import rectangle25 from "../assets/Rectangle 25.jpg";
import locationIcon from "../assets/ep_location.svg";
import rectangle26 from "../assets/Rectangle 26.jpg";
import rectangle27 from "../assets/Rectangle 27.jpg";
import group7 from "../assets/Group 7.svg";
import group12 from "../assets/Group 12.svg";
import rectangle22 from "../assets/Group 11.svg";
import greece from "../assets/Rectangle 17 (1).jpg";
import options from "../assets/OPTIONS.svg";
import building from "../assets/building 1.svg";
import heart from "../assets/heart (6) 1.svg";
import mosque from "../assets/Mask Group.jpg";
import slider from "../assets/Group 3.svg";
import testimonialBackground from "../assets/image 22.jpg";
import profileImg from "../assets/person.jpg";
import Carousel from "react-material-ui-carousel";
import sideimage from "../assets/image 30 (1).jpg";
import sideimage2 from "../assets/image 29.jpg";
import bird from "../assets/Vector.svg";
import icons from "../assets/Group 5.svg";

import background from "../assets/top-section-background.jpg";
import background1 from "../assets/top-section-background-1.jpg";
import background2 from "../assets/top-section-background-2.jpg";
import background3 from "../assets/top-section-background-3.jpg";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const backgroundimages = [background, background1, background2, background3];

function Home() {
  const [activeButton, setActiveButton] = useState(null);

  const clickButton = (button) => {
    if (activeButton) {
      activeButton.classList.remove("clickedButton");
    }
    button.classList.add("clickedButton");
    setActiveButton(button);
  };

  const testimonials = [
    {
      profileImg: profileImg,
      text: "I've been using this product for a few weeks now, and I'm blown away by the results. It's exceeded all my expectations! Highly recommended.",
      name: "John Smith",
    },
    {
      profileImg: profileImg,
      text: "I was skeptical at first, but after trying this service, I'm a believer! It's incredibly user-friendly and has saved me so much time and hassle.",
      name: "Emily Johnson",
    },
    {
      profileImg: profileImg,
      text: "As a small business owner, I'm always looking for tools to streamline my workflow. This product has been a game-changer for me. Thank you!",
      name: "Michael Brown",
    },
  ];

  return (
    <>
      <div className="image-container">
        <header className="header">
          <div className="logo">
            <p>Travel</p>
            <p>Goo</p>
          </div>
          <div className="links">
            <p>
              <a href="/">Home</a>
            </p>
            <p>
              <a href="/about">About us</a>
            </p>
            <p>
              <a href="/packages">Packages</a>
            </p>
          </div>

          <div class="profile">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.809 34.714C21.654 33.714 26.367 33.8 33.221 34.749C33.7174 34.821 34.1709 35.0701 34.4979 35.4504C34.8249 35.8307 35.0033 36.3165 35 36.818C35 37.298 34.835 37.764 34.537 38.128C34.0176 38.7626 33.4855 39.3868 32.941 40H35.582C35.748 39.802 35.915 39.6 36.084 39.395C36.6772 38.6676 37.0007 37.7576 37 36.819C37 34.794 35.522 33.049 33.495 32.769C26.479 31.798 21.575 31.705 14.52 32.736C12.472 33.035 11 34.807 11 36.846C11 37.751 11.295 38.646 11.854 39.371C12.019 39.585 12.182 39.795 12.344 40.001H14.921C14.4144 39.3945 13.9203 38.7777 13.439 38.151C13.153 37.7758 12.9987 37.3168 13 36.845C13 35.768 13.774 34.865 14.809 34.714ZM24 25C24.7879 25 25.5681 24.8448 26.2961 24.5433C27.0241 24.2417 27.6855 23.7998 28.2426 23.2426C28.7998 22.6855 29.2417 22.0241 29.5433 21.2961C29.8448 20.5681 30 19.7879 30 19C30 18.2121 29.8448 17.4319 29.5433 16.7039C29.2417 15.9759 28.7998 15.3145 28.2426 14.7574C27.6855 14.2002 27.0241 13.7583 26.2961 13.4567C25.5681 13.1552 24.7879 13 24 13C22.4087 13 20.8826 13.6321 19.7574 14.7574C18.6321 15.8826 18 17.4087 18 19C18 20.5913 18.6321 22.1174 19.7574 23.2426C20.8826 24.3679 22.4087 25 24 25ZM24 27C26.1217 27 28.1566 26.1571 29.6569 24.6569C31.1571 23.1566 32 21.1217 32 19C32 16.8783 31.1571 14.8434 29.6569 13.3431C28.1566 11.8429 26.1217 11 24 11C21.8783 11 19.8434 11.8429 18.3431 13.3431C16.8429 14.8434 16 16.8783 16 19C16 21.1217 16.8429 23.1566 18.3431 24.6569C19.8434 26.1571 21.8783 27 24 27Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 42C33.941 42 42 33.941 42 24C42 14.059 33.941 6 24 6C14.059 6 6 14.059 6 24C6 33.941 14.059 42 24 42ZM24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
                fill="white"
              />
            </svg>
          </div>
        </header>

        <section>
          <h1 class="heading1">Your imagination is only your limit</h1>
          <p class="paragraph1">
            We always try to make our customer Happy. We provide all kind of
            facilities. Your Satisfaction is our main priority
          </p>

          <a href="#">
            <p>Discover More</p>
          </a>
        </section>
      </div>

      <div class="services">
        <p id="heading">Our Services</p>

        <div class="service_cards">
          <div class="card1">
            <img src={icon1} width={46} height={27.26} />
            <p class="text1">Ticket Booking</p>
            <p class="text2">
              {" "}
              We book all kind of national or international ticket for your
              destinaion.{" "}
            </p>
          </div>

          <div class="card2">
            <img src={icon3} width={46} height={27.26} />
            <p class="text1">Hotel Booking</p>
            <p class="text2">
              {" "}
              You can easily book your according to your budget hotel by our
              website.{" "}
            </p>
          </div>

          <div class="card1">
            <img src={icon2} width={46} height={27.26} />
            <p class="text1" style={{ marginLeft: "30px" }}>
              {" "}
              Tour Planning
            </p>
            <p class="text2">
              {" "}
              We provide you the best plan within a short time explore more.{" "}
            </p>
          </div>
        </div>
      </div>

      <div class="stats">
        <p class="heading">We always try to give you the best service</p>
        <p class="text">
          We always try to make our customer Happy. We provide all kind of
          facilities. Your Satisfaction is our main priority.
        </p>

        <div class="cards">
          <div class="card">
            <img src={calender} width={42} height={42} />
            <p class="figure">15+</p>
            <p class="description">Years of Experience</p>
          </div>

          <div class="card">
            <img src={antChart} width={42} height={42} />
            <p class="figure">15k+</p>
            <p class="description">Happy Travellers</p>
          </div>

          <div class="card">
            <img src={carbonMap} width={42} height={42} />
            <p class="figure">650+</p>
            <p class="description">Places Visited</p>
          </div>

          <div class="card">
            <img src={gridIcons} width={42} height={42} />
            <p class="figure">2k+</p>
            <p class="description">Travel History</p>
          </div>
        </div>
      </div>

      <div class="destinations">
        <p class="heading">Our Popular Destinations</p>

        <section>
          <div class="map">
            <img src={elipse} id="elipse1" />
            <img src={elipse} id="elipse2" />
            <img src={elipse} id="elipse3" />
          </div>

          <div class="cards">
            <a href="#" class="card">
              <div id="image1"></div>

              <p class="country">Thailand</p>
              <p class="decr">20+ Spots 2D & 3N</p>

              <img src={arrow} />
            </a>

            <a href="#" class="card">
              <div id="image2"></div>

              <p class="country">Indonesia</p>
              <p class="decr">25+ Spots 3D & 3N</p>

              <img src={arrow} />
            </a>

            <a href="#" class="card">
              <div id="image3"></div>

              <p class="country">New Zeland</p>
              <p class="decr">20+ Spots 3D & 2N</p>

              <img src={arrow} />
            </a>
          </div>
        </section>
      </div>

      <div class="best_packages">
        <p>Best Packages for you</p>

        <div className="options">
          <button onClick={(e) => clickButton(e.target)}>Hot Deals</button>
          <button onClick={(e) => clickButton(e.target)}>Backpack</button>
          <button onClick={(e) => clickButton(e.target)}>South Asia</button>
          <button onClick={(e) => clickButton(e.target)}>Honeymoon</button>
          <button onClick={(e) => clickButton(e.target)}>Europe</button>
          <button onClick={(e) => clickButton(e.target)}>More</button>
        </div>

        <div class="packages">
          <div class="package">
            <img src={rectangle25} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$500 / Person</p>
              <p class="text3">
                Explore the Beauty of the island for 3 days and 2 nights with
                our travel agency
              </p>
              <img src={locationIcon} />
              <p class="text4">Indonesia</p>
              <a href="#">Know More</a>
            </div>
          </div>

          <div class="package">
            <img src={rectangle26} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$800 / Person</p>
              <p class="text3">
                Enjoy the Shrimes and blossoms here in this beautiful country
              </p>
              <img src={locationIcon} />
              <p class="text4">Japan</p>
              <a href="#">Know More</a>
            </div>
          </div>

          <div class="package">
            <img src={rectangle27} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$600 / Person</p>
              <p class="text3">
                Explore the majestic mountains and landscapes day and nights
              </p>
              <img src={locationIcon} />
              <p class="text4">Mountains</p>
              <a href="#">Know More</a>
            </div>
          </div>
        </div>

        <a class="discover" href="#">
          <p>Discover More</p>
        </a>
      </div>

      <div class="steps">
        <p class="heading">Book Your Next Trip in 3 Easy Steps</p>
        <p class="note">Easy and Fast</p>
        <section>
          <div class="steps_cards">
            <div class="card">
              <img src={group7} />
              <p class="title">Choose Destination</p>
              <p class="text">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                tortor tempus.{" "}
              </p>
            </div>
            <div class="card">
              <img src={group12} />
              <p class="title">Make Payment</p>
              <p class="text">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                tortor tempus.{" "}
              </p>
            </div>
            <div class="card">
              <img src={rectangle22} />
              <p class="title">Reach Airport on Date</p>
              <p class="text">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                tortor tempus.{" "}
              </p>
            </div>
          </div>

          <div class="container">
            <div class="card">
              <img class="poster" src={greece} />
              <p class="title">Trip To Greece</p>
              <p class="text">14-29 June | by Robbin joseph</p>
              <img class="options" src={options} />
              <img class="building" src={building} />
              <p class="text1">24 people going</p>
              <img class="heart" src={heart} />
            </div>

            <div class="small-card">
              <img class="poster" src={mosque} />
              <p class="text">Ongoing</p>
              <p class="text1">Trip to rome</p>
              <p class="text2">40% completed</p>
              <img class="slider" src={slider} />
            </div>
          </div>
        </section>
      </div>

      <div class="testimonials">
        <p class="heading">What People Say About Us</p>

        <img class="sideimage" src={sideimage} />
        <img class="sideimage2" src={sideimage2} />
        <img class="bird" src={bird} />

        <Carousel
          indicators={true}
          navButtonsAlwaysInvisible
          duration={50}
          slider
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} class="testimonial">
              <img src={testimonialBackground} />

              <div class="small-container">
                <div class="card">
                  <img src={testimonial.profileImg} />
                  <p class="text">{testimonial.text}</p>
                  <p class="name">-{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div class="subscription">
        <div class="container">
          <img src={icons} />
          <p class="heading">
            Subscribe to get information, latest news and other interesting
            offers about Cobham
          </p>
          <input type="text" placeholder="Enter your email" />
          <button>
            <p>Subscribe</p>
          </button>
        </div>
      </div>

      <footer>
        <div class="container">
          <div class="container1">
            <p class="text">Travel</p>
            <p class="text">Goo</p>
            <p class="text2">
              Book your trip in minute, get full Control for much longer.
            </p>
          </div>

          <div class="container2">
            <p class="heading">Company</p>
            <p class="text2">About</p>
            <p class="text2">Careers</p>
            <p class="text2">Mobile</p>
          </div>

          <div class="container2">
            <p class="heading">Contact</p>
            <p class="text2">Help/FAQ</p>
            <p class="text2">Press</p>
            <p class="text2">Affilates</p>
          </div>

          <div class="container2">
            <p class="heading">More</p>
            <p class="text2">Airlinefees</p>
            <p class="text2">Airline</p>
            <p class="text2">Low fare tips</p>
          </div>

          <div class="container2">
            <div class="row">
              <img src={socialLink1} />
              <img src={socialLink2} />
            </div>
            <div class="row">
              <p class="text2">Discover our app</p>
            </div>
            <div class="row">
              <img src={googlePlay} />
              <img src={playStore} style={{ marginLeft: "10px" }} />
            </div>
          </div>
        </div>

        <p class="footnote">All rights reserved@travelgoo.com</p>
      </footer>
    </>
  );
}

export default Home;
