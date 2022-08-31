import { useForm,Controller } from "react-hook-form";
import {useEffect , useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import classes from "./style.module.css";
import firebase from "./firebase";

export default function Home() {
  const { register, handleSubmit, formState: { errors } ,control} = useForm()

  //firebase用のstate
  const [questionnaire, setquestionnaire] = useState(null);
  const [value, setValue] = useState('');

  //ボタン送信時の処理
  const submitBtn = (inputText) => {
    console.log(inputText);
  firebase.firestore().collection('questionnaire').add({
    birthYear: inputText.birthYear,
    choise1: inputText.choise1,
    choise2: inputText.choise2,
    hiddenText : inputText.hiddenText,
    name: inputText.name
  })
    alert('正常に送信されました');
    location.reload();
  }

  //ラジオボタン入力のための判定
  let radioCheckNumber1 = "";
  let radioCheckNumber2 = "";


  //Q3のラジオボタン変更処理
  const radioBtnchange1 = ()=>{
     let isLarningCheckedArray = document.getElementsByName('choise1');
    isLarningCheckedArray.forEach((isLarningChecked,index)=>{
      if(index == 0 && isLarningChecked.checked === true ){
        radioCheckNumber1 = 1;
        radioBtnchangeCheck();
      }
    })
  }

   //Q4のラジオボタン変更処理
  const radioBtnchange2 = ()=>{
     let isLarningCheckedArray = document.getElementsByName('choise2');
    isLarningCheckedArray.forEach((isLarningChecked,index)=>{
      if(index == 0 && isLarningChecked.checked === true ){
        radioCheckNumber2 = 1;
        radioBtnchangeCheck();
      }
    })
  }

  //どちらもyesが選択された場合の関数
  const radioBtnchangeCheck = ()=>{
    if(radioCheckNumber1 == 1 || radioCheckNumber2 == 1){
      const hidenDiv = document.getElementById('hidden');
      hidenDiv.classList.remove('style_hidden__1VKXH');
    }
  }

  //メッセージの取得
  useEffect(() => {
        firebase.firestore().collection('questionnaire')
            .onSnapshot((snapshot) => {
                const questionnaire = snapshot.docs.map(doc => {
                    return doc.data()
                })

                setquestionnaire(questionnaire);
            })
    }, [])

  firebase
  .firestore()
  .collection('questionnaire')
  .onSnapshot(snapshot => {
    const questionnaire = snapshot.docs.map(doc => {
      return doc.data();
    });

    setquestionnaire(questionnaire);
  });

  const inputProps = {
  step: 200,
};
  return (
    <>
    <Container>
      <h1>プログラミング学習に関するアンケート</h1>
      <form onSubmit={handleSubmit(submitBtn)}>
        <div>
          <label htmlFor="name">Q1.名前を入力してください（匿名可）。</label>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{required:true}}
            render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            />
            {errors.name?.type === "required"&& <span>このフィールドは回答必須です</span>}
        </div>
        <div>
          <label htmlFor="birthYear">Q2. 生年月日を入力してください。</label>
          <Controller
          rules={{required:true,pattern:/^[0-9]{8}$/}}
            name="birthYear"
            defaultValue=""
            control={control}
            render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            />
          {errors.birthYear?.type === "required"&& <span>このフィールドは回答必須です</span>}
          {errors.birthYear?.type === "pattern"&& <span>正しい形式で回答してください</span>}
        </div>
        <div>
          <h2>Q3. 現在、プログラミングを学習していますか？</h2>
          <input
            id="isLarning1"
            type="radio"
            name="isLarning"
            value="true"
            onClick={radioBtnchange1}
            {...register('choise1', { required: true })}
          />
           <label htmlFor="isLarning1">はい</label>
          <input
            id="isLarning2"
            type="radio"
            name="isLarning"
            value="false"
            {...register('choise1',
             { required: true })
            }
          />
          <label htmlFor="isLarning2">いいえ</label>
          <input
            id="isLarning3"
            type="radio"
            name="isLarning"
            value="understand"
            {...register('choise1', { required: true })}
          />
          <label htmlFor="isLarning3">分からない</label>
          {errors.choise1?.type === "required"&& <span>このフィールドは回答必須です</span>}
        </div>
        <div>
          <h2>Q4.これまでに、プログラミングを学習したことがありますか？</h2>
          <input
            id="isLarning4"
            type="radio"
            name="isLarning2"
            value="true"
            onClick={radioBtnchange2}
            {...register('choise2', { required: true })}
          />
           <label htmlFor="isLarning4">はい</label>
          <input
            id="isLarning5"
            type="radio"
            name="isLarning2"
            value="false"
            {...register('choise2',
             { required: true })
            }
          />
          <label htmlFor="isLarning5">いいえ</label>
          <input
            id="isLarning6"
            type="radio"
            name="isLarning"
            value="understand"
            {...register('choise2', { required: true })}
          />
          <label htmlFor="isLarning6">分からない</label>
          {errors.choise1?.type === "required"&& <span>このフィールドは回答必須です</span>}
        </div>
        <div id="hidden" className={classes.hidden}>
          <h2>Q5. 今まで学習したプログラミング言語を全て教えてください</h2>
          <Controller
            name="hiddenText"
            defaultValue=""
            control={control}
            render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            />
          {errors.hiddenText?.type === "required"&& <span>このフィールドは回答必須です</span>}
          {errors.hiddenText?.type === "pattern"&& <span>正しい形式で回答してください</span>}
        </div>
        <input type="submit" value="アンケートを提出する" />
      </form>
      {/* // */}
      </Container>
    </>
  )
}