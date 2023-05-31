import React, { useEffect, useRef } from 'react'
import "./UserOptions.css"

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';

import { useReactToPrint } from 'react-to-print';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import FileSaver, { saveAs } from "file-saver"

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Pdf from 'react-to-pdf';


import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
  } from 'react-share';
  



const UserOptions = () => {

 const rootElement = document.getElementById("root");
//  console.log("rootElement==",rootElement)
  

 const rootREf = useRef(null)
 
    useEffect(() => {
        rootREf.current = rootElement
        // console.log("rootREf.current",rootREf.current)
    }, [])
    // console.log("rootREf.current",rootREf.current)

    const [open, setOpen] = React.useState(false);
    const faceBookRef =useRef(null)
    const whatsappref = useRef(null)
    const pdfworkingREf = useRef(null)

    

    const appRef = useRef(null)
//   console.log("faceBookRef ", faceBookRef.current)

    const handlePrint = useReactToPrint({
        // content: () => appRef.current,
        content: () => rootElement,

        
      });

    const actions = [
        { icon: <FileCopyIcon />, name: 'copy with images as pdf' , functiontoCall:()=>{reacttoPDF_working()}},
        { icon: <SaveIcon />, name: 'Save as Image', functiontoCall:()=>{handleDownloadPdf2()} },
        { icon: <PrintIcon />, name: 'Print',functiontoCall:()=>{handlePrint()} },
        { icon: <ShareIcon />, name: 'save as pdf' ,functiontoCall:()=>{handleDownloadPdf()}},
      ];
      const shareUrl = 'https://www.pakkamarwadi.tk/';
    

 
   const reacttoPDF_working =()=>{
    pdfworkingREf.current && pdfworkingREf.current.click()
   }





      const  saveAsJpeg =async ()=>{
    //     htmlToImage.toJpeg(document.getElementById('root'), { quality: 0.95 })
    //   .then(function (dataUrl) {
    //     var link = document.createElement('a');
    //     link.download = 'my-image-name.jpeg';
    //     link.href = dataUrl;
    //     link.click();
    //   });


   await   htmlToImage.toBlob(document.getElementById('root'))
    .then(function (blob) {
      if (window.saveAs) {
        window.saveAs(blob, 'my-node.png');
      } else {
       FileSaver.saveAs(blob, 'my-node.png');
     }
    }).catch((error)=>
    
    console.log(error));
    



      }


      const handleDownloadPdf = async () => {
      
        // const element = rootREf;
        // const element =  await document.getElementById('root');
        const element =  await document.getElementById("root")
        // const element =  await document.getElementsByClassName(".leftproduct")


        
        const canvas = await html2canvas(element ,{
            useCORS:true,
            
            windowHeight:element.scrollHeight,
            windowWidth:element.scrollWidth

        });
        // document.body.appendChild(canvas);  
         const data = await canvas.toDataURL('image/png', 1.0);
        // const data = await canvas.toDataURL('image/png');
        // downloadImage(data, "miiunasd");
        //  await  saveAs( data,"sdfds.png")
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
      };






      const handleDownloadPdf2 = async () => {
      
        // const element = rootREf;
        // const element =  await document.getElementById('root');
        const element =  await document.getElementById("root")
        // const element =  await document.getElementsByClassName(".leftproduct")


        
        const canvas = await html2canvas(element ,{
            useCORS:true,
            
            windowHeight:element.scrollHeight,
            windowWidth:element.scrollWidth

        });
        // document.body.appendChild(canvas);  
         const data = await canvas.toDataURL('image/png', 1.0);
        // const data = await canvas.toDataURL('image/png');
        downloadImage(data, "miiunasd");
        //  await  saveAs( data,"sdfds.png")
        // const pdf = new jsPDF();
        // const imgProperties = pdf.getImageProperties(data);
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight =
        //   (imgProperties.height * pdfWidth) / imgProperties.width;
    
        // pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // pdf.save('print.pdf');
      };







      const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        
        fakeLink.href = blob;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
        };


    // console.log(whatsappref.current)
    const handleFaceBookShare =async ()=>{
        // console.log("cliked")
        try {
            faceBookRef.current&&  faceBookRef.current.click()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
      
 
        
    }
    
    const handleFacewhatsappshare =async()=>{
        // console.log("cliked")
        // console.log(whatsappref.current)
        try {
           await  whatsappref &&   whatsappref.current && whatsappref.current.click()
            .current.click()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
       
 
        
    }




    

    const renderfacebok =(
        <div>

      <FacebookShareButton
        
        url={shareUrl}
        quote={'Title or jo bhi aapko likhna ho'}
        hashtag={'#portfolio...'}
      >
        
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
        </div>
      
    )
  

    const master =(
<div
    style={{
        
      background: '#0000',
      height: '100vh',
      width: '100%',
    }}
  >
    <h1>I hope you like it</h1>

    <FacebookShareButton
      url={shareUrl}
      quote={'Title or jo bhi aapko likhna ho'}
      hashtag={'#portfolio...'}
    >
      <FacebookIcon size={40} round={true} />
    </FacebookShareButton>

    <WhatsappShareButton
      url={shareUrl}
      quote={'Title or jo bhi aapko likhna ho'}
      hashtag={'#portfolio...'}
    >
      <WhatsappIcon size={40} round={true} />
    </WhatsappShareButton>
  </div>

    )

    
  return (
    <div className='masterUseroptions'>
    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1  ,position:'sticky' ,top:"95%",left:"98%"}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        ref={appRef}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.functiontoCall}
          />
        ))}
          <SpeedDialAction
            key={"Facebookshar"}
            icon={<FacebookIcon/>}
            tooltipTitle={"Facebook"}
            onClick={handleFaceBookShare}
      />
             <SpeedDialAction
            key={"whatsapp"}
            icon={<WhatsappIcon/>}
            tooltipTitle={"whatsapp"}
            onClick={handleFacewhatsappshare}
      />
      
            



   
      </SpeedDial>
      <div
    style={{
        
      display:"none"
    }}
  >
    <h1>I hope you like it</h1>

    <FacebookShareButton
    ref={faceBookRef}
      url={shareUrl}
      quote={'Title or jo bhi aapko likhna ho'}
      hashtag={'#portfolio...'}
    >
      <FacebookIcon size={40} round={true} />
    </FacebookShareButton>

    <WhatsappShareButton
       ref={whatsappref}
      url={shareUrl}
      quote={'Title or jo bhi aapko likhna ho'}
      hashtag={'#portfolio...'}
    >
      <WhatsappIcon size={40} round={true} />
    </WhatsappShareButton>
  </div>
    </Box>




 <div  style={{display:"none"}}>
    <Pdf targetRef={rootElement} filename="document.pdf"  >
      {({ toPdf }) => (
          <button onClick={toPdf} className="button" ref={pdfworkingREf}>
              Generate PDF
          </button>
      )}
    </Pdf>
    </div>
    </div>
  )
}

export default UserOptions