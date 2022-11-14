'use client';
import React, { useRef, useState } from 'react';

interface Score {
  id: number;
  score: number;
  units: number;
  grade: number;
  value: string;
}
const course = {
  id: new Date().getTime(),
  score: 0,
  units: 0,
  grade: 0,
  value: '',
};
const courses = [
  {
    id: 1,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
  {
    id: 2,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
  {
    id: 3,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
];

const Hero = () => {
  const [grades, setGrades] = useState(courses as Score[]);
  const [gp, setGp] = useState(0);
  const [cgpa, setCgpa] = useState(0);

  const cgpaRef = useRef<null | HTMLInputElement>(null);
  const totalUnitsRef = useRef<null | HTMLInputElement>(null);

  const addCourse = () => {
    setGrades((prev) => [...prev, { ...course, id: new Date().getTime() }]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let totalScore = 0;
    let totalUnit = 0;
    const formatted = grades.map((score): Score => {
      if (score.score < 40) {
        return { ...score, grade: 0, value: 'F' };
      } else if (score.score < 45) {
        return { ...score, grade: 1, value: 'E' };
      } else if (score.score < 50) {
        return { ...score, grade: 2, value: 'D' };
      } else if (score.score < 60) {
        return { ...score, grade: 3, value: 'C' };
      } else if (score.score < 70) {
        return { ...score, grade: 4, value: 'B' };
      } else if (score.score >= 70) {
        return { ...score, grade: 5, value: 'A' };
      }
      return score;
    });
    setGrades(formatted);
    const yourGp = formatted.reduce(
      (acc, score) => {
        totalScore += score?.grade! * score?.units!;
        totalUnit += score?.units!;
        acc.semesterScore = totalScore;
        acc.semesterUnits = totalUnit;
        acc.gp = totalScore / totalUnit;
        return acc;
      },
      { gp: 0, semesterUnits: 0, semesterScore: 0 }
    );

    setGp(yourGp.gp);
    const cgpa = +cgpaRef.current!.value;
    const totalUnits = +totalUnitsRef.current!.value;
    if (cgpa && totalUnits) {
      const aggregateScore = cgpa * totalUnits;
      const newCgpa =
        (aggregateScore + yourGp.semesterScore) /
        (yourGp.semesterUnits + totalUnits);
      setCgpa(newCgpa);
    } else {
      setCgpa(gp);
    }
  };
  return (
    <main className="bg-white p-4 vh">
      <div className="container mx-auto border border-gray-400 bg-gray-200 p-4 rounded-md max-w-lg">
        <div className="border-b-2 border-gray-200">
          <h1 className="text-2xl font-semibold mb-4 tracking-wide uppercase">
            Grade scale: 5.00
          </h1>
        </div>
        <div className=" rounded-md p-2 ">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col gap-4 bg-orange-400 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">CURRENT CGPA</label>
                <input
                  type="text"
                  ref={cgpaRef}
                  className="w-20 bg-inherit border-b-2 focus:outline-none text-white text-xl"
                />
              </div>
              <div className="flex flex-col gap-4 bg-orange-400 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">TOTAL UNITS TAKEN</label>
                <input
                  type="number"
                  ref={totalUnitsRef}
                  className="w-20 bg-inherit border-b-2 focus:outline-none text-white text-xl"
                />
              </div>
            </div>

            <div className="flex gap-10">
              <h3>Total Score</h3>
              <h3>Units</h3>
              <h3>Grade</h3>
            </div>

            {grades.map((score, index) => {
              return (
                <div
                  key={index}
                  className="mb-4 flex gap-4 bg-orange-400 rounded-md shadow-md p-2"
                >
                  <input
                    type="number"
                    onChange={(e) => (score.score = +e.target.value)}
                    className="w-20 bg-inherit border-b-2 focus:outline-none text-white text-xl"
                  />
                  <input
                    type="number"
                    onChange={(e) => (score.units = +e.target.value)}
                    required
                    className="w-20 bg-inherit border-b-2 focus:outline-none text-white text-xl"
                  />

                  <p className="mr-40">{score.value}</p>
                  <button
                    onClick={() =>
                      setGrades(grades.filter((gd) => gd.id !== score.id))
                    }
                    className="justify-self-end"
                  >
                    remove
                  </button>
                </div>
              );
            })}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-red-400 px-2 py-1 rounded-md text-white shadow-md hover:bg-white hover:text-red-400 transition-all duration-300 ease-linear"
              >
                Calculate GPA
              </button>
              <button
                className="bg-white px-2 py-1 rounded-md text-red-400 shadow-md hover:bg-red-400 hover:text-white transition-all duration-300 ease-linear"
                type="button"
                onClick={addCourse}
              >
                Add Course
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-10">
          <h3>Your GPA is: {gp.toFixed(2)}</h3>
          <h3>Your CGPA is: {cgpa.toFixed(2)}</h3>
        </div>
      </div>
    </main>
  );
};
export default Hero;
