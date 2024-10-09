export default function OurPreview() {
  return (
    <section className="cta -type-1 layout-pt-lg layout-pb-lg">
      <div data-parallax="0.6" className="cta__bg">
        <div
          data-parallax-target
          className="bg-image js-lazy"
          style={{ backgroundImage: "url(/assets/img/about/whoweare/bg.png)" }}
        ></div>
      </div>
    </section>
  );
}
