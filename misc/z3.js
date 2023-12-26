// async function tt() {
 	// const { init } = require("z3-solver");
 	// const { Context } = await init();
// 	const { Solver, Real} = Context("main");
// 	const solver = new Solver();
//     const x = Real.const("x");
// 	solver.add(x.eq(x.mul(2).add(-7)));
// 	if ((await solver.check()) === "sat") {
// 		const model = solver.model();
// 		const answer = model.eval(x).sexpr();
// 		console.log("answer for `x = 2x - 7`  ==> ", (answer));
// 	}
//     else{
//         console.log("Ups");
//     }
// }
// async function run(){
//     await tt();
// 	console.log("I'm done");
// }
// console.log("BEFORE");
// tt();
// console.log("AFTER");
const x = async ()=>{
const { init }  = require("z3-solver");

const { Context } = await init();
const { Solver, Int } = new Context('main');

const x = Int.const('x');
const y = Int.const('y');
const solver = new Solver();
solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10

if (await solver.check() !== "sat") {
  throw new Error("couldn't find a solution")
}
const model = solver.model();

console.log(`x=${model.get(x)}, y=${model.get(y)}`);
// x=0, y=12
};
x();