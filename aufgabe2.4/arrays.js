const { only } = require('node:test');

const grades = [
	{ name: 'Thomann', grade: 5.0 },
	{ name: 'Bürgis', grade: 5.0 },
	{ name: 'Norris', grade: 7.0 },
	{ name: 'Lopez', grade: 6.5 },
	{ name: 'Smith', grade: 4.8 },
	{ name: 'Patel', grade: 6.2 },
	{ name: 'Kim', grade: 5.7 },
	{ name: 'Garcia', grade: 6.0 },
	{ name: 'Zhang', grade: 7.1 },
	{ name: 'Kumar', grade: 5.5 },
];
console.log(grades.filter((grade) => grade.grade > 6));

const gradeNames = grades.map((grade) => `${grade.name}`);
console.log(gradeNames);

console.log(grades.find((grade) => grade.grade === 5));

grades.forEach((grade) => {
	grade.grade *= 10;
	grade.grade += 1;
	grade.grade /= 10;
});
console.log(grades);

let onlyGrades = grades.map((grade) => grade.grade);
let sumAllGrades = onlyGrades.reduce(
	(valueBefore, currentValue) => valueBefore + currentValue
);
let average = sumAllGrades / grades.length;
console.log(Math.round(average * 10) / 10);
