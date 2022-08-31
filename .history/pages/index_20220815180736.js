import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm()

  const submitBtn = (inputText) => {
    console.log(inputText);
  }
  return (
    <>
      <h1>プログラミング学習に関するアンケート</h1>
      <form onSubmit={handleSubmit(submitBtn)}>
        <div>
          <label htmlFor="name">Q1.名前を入力してください（匿名可）。</label>
          <input id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="birthYear">Q2. 生年月日を入力してください。</label>
          <input id="birthYear" {...register("birthYear")} />
        </div>
        <div>
          <h2>現在、プログラミングを学習していますか？</h2>
          <input
            id="isLarning1"
            type="radio"
            name="isLarning"
            value="true"
            {...register('choise1', { required: true })}
          />
          <label htmlFor="isLarning1" value="はい" />
        </div>
        <input type="submit" value="アンケートを提出する" />
      </form>
    </>
  )
}