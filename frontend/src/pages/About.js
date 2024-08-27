const About = () => {
  return (
    document.title = "FitGenius | About",
    <div className="about">
      <h1 className="about-title">About FitGenius</h1>
      <p className="about-description">
        Hey there! I’m <strong>Tejas</strong>, the creator of{" "}
        <strong>FitGenius</strong>. This app was born out of my passion for
        fitness and technology. I wanted to create a tool that could help people
        like you achieve their fitness goals with ease and personalisation.
      </p>
      <p className="about-description">
        FitGenius is designed to provide you with tailored workout plans based
        on your individual needs and preferences. Whether you’re just starting
        your fitness journey or looking to enhance your existing routine,
        FitGenius offers a variety of exercises and routines to fit your
        lifestyle.
      </p>
      <p className="about-description">
        With FitGenius, you can track your progress by logging infromation about
        your workouts, to help you stay motivated and on track.
      </p>
      <p className="about-description">
        I’m thrilled to share this app with you and hope it helps you on your
        fitness journey.
      </p>
      <p>
        <strong>Important Links</strong>
      </p>
      <ul>
        <li>
          My LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/tejas-thind/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          My Email:{" "}
          <a
            href="mailto:tejas.st0544@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            tejas.st0544@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
