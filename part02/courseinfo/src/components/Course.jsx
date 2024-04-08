const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <b>
        total of{" "}
        {course.parts
          .map((part) => part.exercises)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          )}{" "}
        exercises
      </b>
    </div>
  );
};

export default Course;
