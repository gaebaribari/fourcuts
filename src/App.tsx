import './App.css';
import { useRef, useState, useEffect } from 'react';
import FourCuts from './components/FourCuts';
import FeedbackButton from './components/FeedbackButton';
import { UseCapture } from './hooks/useDownload';
import * as Style from './styles/styledComponents';
import * as Button from './styles/button';

function App() {
  
  const FourCutsRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>(Style.colors[0]);
  const [selectedSticker, setSelectedSticker] = useState<string>(Style.stickers[0]);

  useEffect(() => {
  /* eslint no-restricted-globals: ["off"] */
    var inappdeny_exec_vanillajs = (callback:()=>void) => {
      if(document.readyState !== 'loading'){
        callback();
      }else{
        document.addEventListener('DOMContentLoaded', callback);
      } 
    };
    inappdeny_exec_vanillajs(() => { 
      /* Do things after DOM has fully loaded */ 
  
      var useragt = navigator.userAgent.toLowerCase();
      var target_url = location.href;
      
      if(useragt.match(/kakaotalk/i)){
        
        //카카오톡 외부브라우저로 호출
        location.href = 'kakaotalk://web/openExternal?url='+encodeURIComponent(target_url);
        
      }else if(useragt.match(/line/i)){
        
        //라인 외부브라우저로 호출
        if(target_url.indexOf('?') !== -1){
          location.href = target_url+'&openExternalBrowser=1';
        }else{
          location.href = target_url+'?openExternalBrowser=1';
        }
        
      }else if(useragt.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i)){
        
        //그외 다른 인앱들
        if(useragt.match(/iphone|ipad|ipod/i)){
          
          //아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
          //모바일대응뷰포트강제설정
          var mobile = document.createElement('meta');
          mobile.name = 'viewport';
          mobile.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
          document.getElementsByTagName('head')[0].appendChild(mobile);
          //노토산스폰트강제설정
          var fonts = document.createElement('link');
          fonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
          document.getElementsByTagName('head')[0].appendChild(fonts);
          document.body.innerHTML = "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
        
        }else{
          //안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
          location.href='intent://'+target_url.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
        }
      }
    });
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapture = () => {
    UseCapture(FourCutsRef.current);
  };

  return (
    <Style.PageContainer>
      <Style.Wrapper>
        <div style={{ display: 'flex', marginTop: '16px' }}>
          {Style.colors.map((color:string) => (
            <Button.ColorButton
              key={color}
              buttonColor={color}
              onClick={() => handleColorSelect(color)}
              isSelected={color === selectedColor}
            />
          ))}
        </div>
        <Button.ButtonWrap>
          {Style.stickers.map((sticker:string, index:number) => (
            <button
              key={sticker}
              onClick={() => setSelectedSticker(sticker)}
            >
              {selectedSticker === sticker ? '✘' : index === 0 ? '0' : index === 1 ? '1' : index === 2 ? '2' : '3'}
            </button>
          ))}
        </Button.ButtonWrap>
        <FourCuts 
          ref={FourCutsRef} 
          backgroundColor={selectedColor} 
          sticker={selectedSticker} 
        />
        <div style={{ marginTop: '16px' }}>
          <Button.CaptureButton onClick={handleCapture}>
            사진 저장 📷
          </Button.CaptureButton>
          <FeedbackButton />
        </div>
      </Style.Wrapper>
    </Style.PageContainer>
  );
}

export default App;