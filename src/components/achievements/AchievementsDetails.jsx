import React from "react";
import { achievements } from "@/data/achievements"; 

export default function AchievementsDetails({ id }) {
  const data = achievements.filter((elm) => elm.id == id)[0] || achievements[0];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <div className="text-14 text-purple-1 uppercase fw-500 mb-8">
                    {data.category.toUpperCase()}
                  </div>

                  <h1 className="page-header__title lh-14">
                    {data.title.split(" ").slice(0, 4).join(" ")}
                    <br />
                    {data.title.split(" ").slice(4, -1).join(" ")}
                  </h1>

                  <p className="page-header__text">{data.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md">
        <div className="container">
          <div
            className="ratio ratio-16:9 rounded-8 bg-image js-lazy"
            style={{ backgroundImage: `url(${data.imageSrc})` }}
            data-bg="img/achievement-single/images.png"
          ></div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="blogSection">
            <div className="blogCard">
              <div className="row justify-center">
                <div className="col-xl-8 col-lg-9 col-md-11">
                  <div className="blogCard__content">
                    <h4 className="text-18 fw-500">
                      What makes a good brand book?
                    </h4>
                    <p className="mt-30">
                      Sed viverra ipsum nunc aliquet bibendum enim facilisis
                      gravida. Diam phasellus vestibulum lorem sed risus
                      ultricies. Magna sit amet purus gravida quis blandit. Arcu
                      cursus vitae congue mauris. Nunc mattis enim ut tellus
                      elementum sagittis vitae et leo. Semper risus in hendrerit
                      gravida rutrum quisque non. At urna condimentum mattis
                      pellentesque id nibh tortor. A erat nam at lectus urna
                      duis convallis convallis tellus. Sit amet mauris commodo
                      quis imperdiet massa. Vitae congue eu consequat ac felis.
                    </p>

                    <ul className="ul-list y-gap-10 mt-30">
                      <li>
                        Sed viverra ipsum nunc aliquet bibendum enim facilisis
                        gravida.
                      </li>
                      <li>
                        At urna condimentum mattis pellentesque id nibh. Laoreet
                        non curabitur
                      </li>
                      <li>Magna etiam tempor orci eu lobortis elementum.</li>
                      <li>
                        Bibendum est ultricies integer quis. Semper eget duis at
                        tellus.
                      </li>
                    </ul>

                    {/* <!-- <div className="py-25 pl-90 lg:pl-80 md:px-32 border-left-2-accent text-center mt-30 lg:mt-40">
                  <div className="">
                    <i className="icon icon-quote"></i>
                  </div>

                  <div className="text-dark-1 fw-500 italic text-2xl lh-17">
                    “Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Diam phasellus vestibulum lorem sed risus ultricies. Magna sit amet purus gravida quis blandit. Arcu cursus vitae congue mauris.“
                  </div>
                </div> --> */}

                    <p className="mt-30">
                      Donec purus posuere nullam lacus aliquam egestas arcu. A
                      egestas a, tellus massa, ornare vulputate. Erat enim eget
                      laoreet ullamcorper lectus aliquet nullam tempus id.
                      Dignissim convallis quam aliquam rhoncus, lectus nullam
                      viverra. Bibendum dignissim tortor, phasellus pellentesque
                      commodo, turpis vel eu. Donec consectetur ipsum nibh
                      lobortis elementum mus velit tincidunt elementum.
                      Ridiculus eu convallis eu mattis iaculis et, in dolor. Sem
                      libero, tortor suspendisse et, purus euismod posuere sit.
                      Risus dui ut viverra venenatis ipsum tincidunt non, proin.
                      Euismod pharetra sit ac nisi. Erat lacus, amet quisque
                      urna faucibus. Rhoncus praesent faucibus rhoncus nec
                      adipiscing tristique sed facilisis velit.
                      <br />
                      <br />
                      Neque nulla porta ut urna rutrum. Aliquam cursus arcu
                      tincidunt mus dictum sit euismod cum id. Dictum integer
                      ultricies arcu fermentum fermentum sem consectetur.
                      Consectetur eleifend aenean eu neque euismod amet
                      parturient turpis vitae. Faucibus ipsum felis et duis
                      fames.
                    </p>
                  </div>

                  <div className="row y-gap-30 pt-30">
                    <div className="col-sm-6">
                      <img
                        src="/assets/img/achievement-single/images.png"
                        alt="image"
                        className="w-1/1 initial-img rounded-8"
                      />
                    </div>
                    <div className="col-sm-6">
                      <img
                        src="/assets/img/achievement-single/images.png"
                        alt="image"
                        className="w-1/1 initial-img rounded-8"
                      />
                    </div>
                  </div>

                  <div className="blogCard__content pt-30">
                    <p>
                      Donec purus posuere nullam lacus aliquam egestas arcu. A
                      egestas a, tellus massa, ornare vulputate. Erat enim eget
                      laoreet ullamcorper lectus aliquet nullam tempus id.
                      Dignissim convallis quam aliquam rhoncus, lectus nullam
                      viverra. Bibendum dignissim tortor, phasellus pellentesque
                      commodo, turpis vel eu. Donec consectetur ipsum nibh
                      lobortis elementum mus velit tincidunt elementum.
                      Ridiculus eu convallis eu mattis iaculis et, in dolor. Sem
                      libero, tortor suspendisse et, purus euismod posuere sit.
                      Risus dui ut viverra venenatis ipsum tincidunt non, proin.
                      Euismod pharetra sit ac nisi. Erat lacus, amet quisque
                      urna faucibus. Rhoncus praesent faucibus rhoncus nec
                      adipiscing tristique sed facilisis velit.
                      <br />
                      <br />
                      Neque nulla porta ut urna rutrum. Aliquam cursus arcu
                      tincidunt mus dictum sit euismod cum id. Dictum integer
                      ultricies arcu fermentum fermentum sem consectetur.
                      Consectetur eleifend aenean eu neque euismod amet
                      parturient turpis vitae. Faucibus ipsum felis et duis
                      fames.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
