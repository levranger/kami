export default function MapEmbed() {
  return (
    <section aria-label="Our location" className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.467990071206!2d-80.1417244!3d25.9526878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9adb6e7f31865%3A0x3d52fcb6e4c39a8d!2sKami%20Aesthetics!5e0!3m2!1sen!2sus!4v1774623599275!5m2!1sen!2sus"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kami Aesthetics location on Google Maps"
      />
    </section>
  );
}
