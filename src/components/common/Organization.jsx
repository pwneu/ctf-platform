
import { organization } from "../../data/organization"; 
const Organization = ({ backgroundColorComponent, brandsTwo }) => {
  return (
    <>
      <section
        className={` ${
          brandsTwo ? "layout-pt-md" : "layout-pt-lg"
        }  layout-pb-md  ${
          backgroundColorComponent ? backgroundColorComponent : ""
        } `}
      >
        <div className="container">
          <div className="row justify-center">
            <div className="col text-center">
              {/* <p className="text-lg text-dark-1">Trusted by leading organizations and industry experts</p> */}
            </div>
          </div>
          <div
            className={`row y-gap-30 justify-between sm:justify-start items-center pt-60 md:pt-50`}
          >
            {organization.map((logo, i) => (
              <div
                data-aos="fade-up"
                data-aos-duration="300"
                key={i}
                className="col-lg-auto col-md-3 col-sm-4 col-6"
              >
                {/* <div className="d-flex justify-center items-center px-4">
                  <img
                    className="w-1/1"
                    src={logo && logo}
                    alt="clients image"
                    style={{ objectFit: "contain" }}
                  />
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Organization;
