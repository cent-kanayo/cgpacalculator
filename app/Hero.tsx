'use client';
import React, { useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

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
  const [showGrade, setShowGrade] = useState(false);

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
      return { ...score, value: '' };
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
      setCgpa(yourGp.gp);
    }
    setShowGrade(true);
  };
  return (
    <main className="w-full p-2 md:max-w-[500px] mx-auto">
      <div className=" border border-gray-400 bg-white p-4 rounded-md ">
        <div className="border-b-2 border-gray-200">
          <h1 className="text-2xl text-center text-blue-700 font-semibold mb-4 tracking-wide uppercase">
            Grade scale: 5.00
          </h1>
        </div>
        <div className=" rounded-md p-2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6 gap-x-5">
              <div className="flex-1 flex flex-col gap-4 text-blue-600 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">CURRENT CGPA</label>
                <input
                  type="number"
                  ref={cgpaRef}
                  className="w-full bg-inherit border-b-2 focus:outline-none text-blue-600 text-xl"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 text-blue-600 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">TOTAL UNITS TAKEN</label>
                <input
                  type="number"
                  ref={totalUnitsRef}
                  className="w-full bg-inherit border-b-2 focus:outline-none text-blue-600 text-xl"
                />
              </div>
            </div>
            <div className="bg-blue-700 text-white  py-2 text-xl rounded-md mb-8 ">
              <h3>Current semester scores</h3>
            </div>

            <div className="flex gap-10 text-blue-600 mb-4">
              <h3>Course Score</h3>
              <h3>Course Units</h3>
              {showGrade && <h3>Grade</h3>}
            </div>
            {grades.map((score, index) => {
              return (
                <div
                  key={index}
                  className="mb-6 flex items-center justify-between gap-12 bg-white border-2 border-blue-700  rounded-md shadow-md p-2"
                >
                  <input
                    type="number"
                    onChange={(e) => (score.score = +e.target.value)}
                    className="w-14 bg-inherit border-b-2 border-blue-700 focus:outline-none text-blue-600 text-xl"
                  />
                  <input
                    type="number"
                    onChange={(e) => (score.units = +e.target.value)}
                    required
                    className="w-14 bg-inherit border-b-2 border-blue-700  md:mr-10 focus:outline-none text-blue-600 text-xl"
                  />

                  <p className="mr-20 text-blue-600 ">{score.value}</p>
                  <button
                    onClick={() =>
                      setGrades(grades.filter((gd) => gd.id !== score.id))
                    }
                    className="justify-self-end bg-"
                  >
                    <FaTrash fill="blue" />
                  </button>
                </div>
              );
            })}
            <div className="flex justify-between mb-4">
              <button
                type="submit"
                className="bg-blue-600 px-2 py-1 rounded-md text-white shadow-md  hover:animate-pulse transition-all duration-300 ease-linear"
              >
                Calculate GPA
              </button>
              <button
                className="bg-white px-2 py-1 rounded-md text-blue-600 border-2 border-blue-700 hover:animate-pulse transition-all duration-300 ease-linear"
                type="button"
                onClick={addCourse}
              >
                Add Course
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-10 text-blue-700 text-xl font-semibold">
          <h3>Your GPA is: {gp.toFixed(2)}</h3>
          <h3>Your CGPA is: {cgpa.toFixed(2)}</h3>
        </div>
      </div>
    </main>
  );
};
export default Hero;
