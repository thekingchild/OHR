// Compose the page

function App() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Services />
        <Solutions />
        <Benefits />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
