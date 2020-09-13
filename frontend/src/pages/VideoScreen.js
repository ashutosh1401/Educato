import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVideo, listVideos, saveVideo } from '../actions/videoActions';
function VideoScreen(){
    const [modal,setModal] = useState(false);
    const [modal1,setModal1] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [id,setId] = useState('');
    const [url,setUrl] = useState('');
    const [body,setBody] = useState('');
    const [title,setTitle] = useState('');
    const videoList = useSelector(state=>state.videoList);
    const {loading,videos,error} = videoList;
    const videoSave = useSelector(state=>state.videoSave);
    const {loading:loadingSave,success:successSave,error:errorSave} = videoSave;
    const videoDelete = useSelector(state=>state.videoDelete);
    const {loading:loadingDel,success:successDel,error:errorDel} = videoDelete;
    const dispatch = useDispatch();
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

        var uservid = videos.filter(x=>x.postedBy===userInfo._id)
    
   
    useEffect(()=>{
        if(successSave){
            setModal(false);
          
        }
        dispatch(listVideos());
        return()=>{
            // 
        };
    },[successSave,successDel]);

    const deleteHandler = (video) =>{
        dispatch(deleteVideo(video._id));
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveVideo({
            _id:id,
            title,
            url,
            body
        }))
        setModal(false);
    }
    const openmodal2 = (video) =>{
        modal2?setModal2(false):setModal2(true)
        if(video){
            setTitle(video.title);
            setBody(video.body);
            setUrl(video.url);
        }
    }
    const openmodal1 =() =>{
        // setModal1(true)
        modal1?setModal1(false):setModal1(true)
        // console.log(uservid)
        // console.log(videos)
    }
    const openmodal = (video) =>{
        setModal(true);
       var bg =  document.querySelector(".vid-bg-img");
       var style = bg.style;
       console.log(style.position)
        if(video){
            setId(video._id);
            setTitle(video.title);
            setBody(video.body);
            setUrl(video.url);
        }
       
    }


    return  <div class="main">
    <div class="vid-bg-img">
        <svg width="1000" height="1000" viewBox="0 0 1546 1408" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="773" cy="704" rx="773" ry="704" fill="url(#paint0_radial)" fill-opacity="0.28"/>
            <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(397 186.5) rotate(44.6191) scale(1435.81 1576.54)">
            <stop stop-color="#3103EB"/>
            <stop offset="1" stop-color="#EB07F0" stop-opacity="0.54"/>
            </radialGradient>
            </defs>
            </svg>
    </div>

<header>
    <div class="header-nav-prof">
        <Link to="/">Home</Link>
        <Link to="/#about">About</Link>
        <Link to="/#features">Features</Link>
        {userInfo?<Link to="/profile"><span className="prof-home">{userInfo.name[0]}</span></Link>:<a href="#">Log In</a>}
    </div>
</header>
{!modal?<div></div>:<div className="divi-container">
               <span onClick={()=>setModal(false)} className="close">&#x2716;</span>
                {id?<h1>Update video</h1>:<h1>Add Video</h1>}
                
                <form onSubmit={submitHandler}>
                    <div className="product-container">
                    <div>
                        <input type="text" name="title" autoComplete="off" required  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                        <label>Title</label>
                    </div>
                    <div>
                        <input type="text" name="body" required value={body} onChange={(e)=>setBody(e.target.value)}></input>
                        <label>Body</label>
                    </div>
                    <div>
                        <input type="text" name="url" required value={url} onChange={(e)=>setUrl(e.target.value)}></input>
                        <label>Url</label>
                    </div>
                    <input type="submit" value={id?"Update":"Add Video"}></input>
                    </div>
                </form>
            </div>}
    <div class="video-con">
        <div class="add" onClick={openmodal}>Add Video</div>
        <div class="add" onClick={openmodal1}>My Videos</div>            
    </div>
    {
        loadingSave?<div>Loading...</div>:
        loadingDel?<div>Loading...</div>:
        modal1?<div className="video-list">
        <div className="table-name">
            {uservid.length!==0?uservid.map(video =>
                (<div key={video._id}> 
            <div className="td">
                <div  onClick={()=>openmodal2(video)}>
                <div className="title_video">{video.title}</div>
                <div className="body_video">{video.body}</div>
                </div>     
            <div className="btn">
                <input type="button" value="Edit" onClick={()=>openmodal(video)}></input>
                <input type="button" value="Delete" onClick={()=>deleteHandler(video)} ></input>
            </div>
            </div>
           
            </div>))
            :<div><div className="no-video">No Videos Added</div><div className="no-video-svg"></div></div>}
          
        </div>
     
    </div>:<div></div>
    }
    {
        modal2?<div className="modal2">
               <span onClick={()=>setModal2(false)} className="close">&#x2716;</span>
        <h1>{title}</h1>
        <div className="modal2-body">
            {body}
        </div>
        <div className="modal2-url" onClick={()=>{window.open(url);setModal2(false);}}>
            {url}
        </div>
    </div>:<div></div>
    }
    
    
    <div class="video_svg">
        <svg width="462" height="340" viewBox="0 0 562 470" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
            <path d="M480.348 303.269C525.443 303.269 562 268.866 562 226.428C562 183.99 525.443 149.587 480.348 149.587C435.252 149.587 398.696 183.99 398.696 226.428C398.696 268.866 435.252 303.269 480.348 303.269Z" fill="#3F3D56"/>
            <path d="M104.457 179.135L148.586 387.9L360.516 462.312C375.249 425.292 378.681 385.131 370.423 346.372C346.052 231.074 226.975 156.199 104.457 179.135Z" fill="#F2F2F2"/>
            <path d="M85.8601 452.307C92.7945 464.41 107.512 469.605 107.512 469.605C107.512 469.605 110.986 455.178 104.052 443.076C97.1174 430.974 82.4001 425.778 82.4001 425.778C82.4001 425.778 78.9258 440.205 85.8601 452.307Z" fill="#3F3D56"/>
            <path d="M90.6264 448.326C103.146 455.414 107.967 469.493 107.967 469.493C107.967 469.493 92.4911 472.08 79.9716 464.992C67.4522 457.904 62.6306 443.824 62.6306 443.824C62.6306 443.824 78.107 441.237 90.6264 448.326Z" fill="#F409C1"/>
            <path d="M103.274 470C122.889 421.449 125.723 358.626 121.604 289.882C121.544 288.797 121.478 287.709 121.406 286.616C120.788 276.706 120.035 266.685 119.148 256.552H161.962C161.379 267.073 160.965 277.491 160.719 287.808C160.701 288.492 160.689 289.17 160.671 289.842C159.302 355.903 165.588 417.285 186.061 470H103.274Z" fill="#3F3D56"/>
            <path d="M424.446 469.618C411.069 467.485 398.204 465.654 385.852 464.123L390.735 455.214C389.089 454.675 381.855 459.778 381.855 459.778L388.263 433.915C379.981 434.855 375.771 461.262 375.771 461.262L366.519 452.334L370.998 462.372C333.193 458.182 300.543 456.629 273.081 456.573L277.261 448.947C275.614 448.409 268.38 453.511 268.38 453.511L274.788 427.648C266.507 428.588 262.296 454.995 262.296 454.995L253.044 446.067L257.788 456.699C238.972 456.991 220.185 458.192 201.5 460.297C205.727 448.417 220.088 437.119 220.088 437.119C209.121 440.188 203.368 445.332 200.362 450.127C200.093 425.616 204.424 401.251 213.156 378.156C213.156 378.156 190.487 424.578 193.38 455.739L193.726 461.272C174.508 463.862 166.947 469.946 166.947 469.946L424.446 469.618Z" fill="#3F3D56"/>
            <path d="M279.808 178.746C278.317 259.862 215.163 287.162 137.907 285.905C136.112 285.876 134.326 285.832 132.55 285.772C128.97 285.654 125.43 285.471 121.927 285.222C52.2707 280.287 -1.35956 249.632 0.026275 174.194C1.46042 96.1255 136.661 7.12656 146.514 0C146.522 0.000146901 281.298 97.6365 279.808 178.746Z" fill="url(#paint0_linear)"/>
            <path d="M231.846 369.168C241.342 369.168 249.039 361.925 249.039 352.989C249.039 344.053 241.342 336.809 231.846 336.809C222.351 336.809 214.654 344.053 214.654 352.989C214.654 361.925 222.351 369.168 231.846 369.168Z" fill="#2F2E41"/>
            <path d="M213.221 347.865C222.716 347.865 230.414 340.621 230.414 331.686C230.414 322.75 222.716 315.506 213.221 315.506C203.726 315.506 196.028 322.75 196.028 331.686C196.028 340.621 203.726 347.865 213.221 347.865Z" fill="#2F2E41"/>
            <path d="M198.391 345.083C200.616 346.597 203.195 347.587 205.91 347.971C208.625 348.354 211.398 348.121 213.998 347.289C216.597 346.457 218.947 345.051 220.851 343.19C222.755 341.328 224.158 339.064 224.941 336.588C224.645 338.807 223.863 340.944 222.644 342.865C221.425 344.785 219.797 346.447 217.862 347.745C215.926 349.043 213.726 349.95 211.399 350.407C209.073 350.865 206.671 350.864 204.345 350.403C202.019 349.943 199.82 349.034 197.886 347.734C195.952 346.434 194.326 344.77 193.11 342.848C191.893 340.926 191.114 338.788 190.82 336.569C190.526 334.349 190.725 332.096 191.403 329.953C191.018 332.833 191.463 335.757 192.693 338.42C193.923 341.082 195.891 343.384 198.391 345.083V345.083Z" fill="#2F2E41"/>
            <path d="M236.288 372.539C244.042 372.539 250.328 366.623 250.328 359.326C250.328 352.028 244.042 346.113 236.288 346.113C228.533 346.113 222.247 352.028 222.247 359.326C222.247 366.623 228.533 372.539 236.288 372.539Z" fill="#FFB8B8"/>
            <path d="M241.159 370.112C241.159 370.112 235.428 378.202 236.288 381.708C236.288 381.708 240.013 383.326 240.013 383.865C240.013 384.404 243.451 389.528 243.451 389.528L247.463 394.651L249.182 401.393H240.872L231.703 394.651L222.82 385.483C222.82 385.483 216.803 382.786 213.651 384.944L211.931 386.292C211.931 386.292 217.949 378.741 220.814 377.123C220.814 377.123 225.972 371.191 225.399 365.258L241.159 370.112Z" fill="#FFB8B8"/>
            <path d="M238.867 381.438C238.867 381.438 244.598 384.404 246.89 390.067C249.182 395.73 259.498 414.606 259.498 414.606C259.498 414.606 260.358 426.741 259.784 427.28C259.211 427.82 252.621 421.887 251.475 420.269C250.328 418.651 245.744 399.236 245.744 399.236L238.294 387.91L236.861 381.438H238.867Z" fill="#FFB8B8"/>
            <path d="M256.919 415.415L259.498 414.606C259.498 414.606 275.258 405.438 276.118 401.393C276.977 397.348 289.585 383.865 289.872 391.146C290.158 398.427 280.702 406.516 280.702 406.516C280.702 406.516 260.071 433.752 258.925 425.932L256.919 415.415Z" fill="#FFB8B8"/>
            <path d="M230.843 396.809C230.843 396.809 230.557 404.359 219.382 407.056C219.382 407.056 207.92 421.617 206.774 428.089C205.627 434.561 175.54 467.729 175.54 467.729C175.54 467.729 147.745 470.965 147.745 467.729C147.745 464.493 170.955 461.797 170.955 461.797C170.955 461.797 195.312 427.82 196.458 423.235C197.604 418.651 208.493 384.674 213.651 384.944C213.651 384.944 218.522 382.786 221.387 384.404C224.253 386.022 230.843 396.809 230.843 396.809Z" fill="#FFB8B8"/>
            <path d="M264.369 427.28C264.369 427.28 284.427 401.932 288.726 400.314C293.024 398.696 298.468 397.618 301.62 401.393C304.772 405.168 342.023 449.392 342.023 449.392C342.023 449.392 355.204 462.066 361.795 459.64C361.795 459.64 365.233 462.336 357.21 462.875C351.993 463.135 346.766 462.589 341.736 461.257C341.736 461.257 336.865 462.066 333.427 462.875C329.988 463.684 325.69 463.954 325.977 461.797L327.123 453.168C327.123 453.168 297.609 430.246 296.749 420.539C296.749 420.539 297.322 415.954 296.749 416.494C296.176 417.033 284.141 429.168 278.697 431.864C273.252 434.561 259.785 438.336 259.785 438.336L264.369 427.28Z" fill="#FFB8B8"/>
            <path opacity="0.1" d="M264.369 427.28C264.369 427.28 284.427 401.932 288.726 400.314C293.024 398.696 298.468 397.618 301.62 401.393C304.772 405.168 342.023 449.392 342.023 449.392C342.023 449.392 355.204 462.066 361.795 459.64C361.795 459.64 365.233 462.336 357.21 462.875C351.993 463.135 346.766 462.589 341.736 461.257C341.736 461.257 336.865 462.066 333.427 462.875C329.988 463.684 325.69 463.954 325.977 461.797L327.123 453.168C327.123 453.168 297.609 430.246 296.749 420.539C296.749 420.539 297.322 415.954 296.749 416.494C296.176 417.033 284.141 429.168 278.697 431.864C273.252 434.561 259.785 438.336 259.785 438.336L264.369 427.28Z" fill="black"/>
            <path d="M261.217 430.786C261.217 430.786 287.579 421.348 291.018 419.19C294.456 417.033 306.778 412.719 313.082 417.572C319.386 422.426 350.046 444.808 360.362 446.965C370.678 449.123 388.443 454.246 388.443 454.246C388.443 454.246 399.905 455.055 387.584 459.639C387.584 459.639 372.397 460.988 369.818 463.145C367.239 465.302 358.643 467.999 358.07 464.493C357.497 460.988 355.777 456.404 352.625 455.864C349.473 455.325 311.649 445.617 305.918 435.1C305.918 435.1 293.024 441.842 285 449.662C276.977 457.482 258.065 461.797 258.065 461.797L261.217 430.786Z" fill="#FFB8B8"/>
            <path d="M251.761 422.157C251.761 422.157 264.322 425.299 265.348 424.132C266.375 422.966 271.819 429.438 266.662 442.381C261.504 455.325 262.65 461.258 259.784 463.145C256.919 465.033 243.451 462.066 239.44 463.415C235.428 464.763 230.27 465.842 228.551 458.022C226.832 450.201 222.534 436.449 223.393 434.561C224.253 432.673 228.838 428.359 228.838 428.359L238.294 423.775L251.761 422.157Z" fill="#2F2E41"/>
            <path d="M208.35 391.82C208.35 391.82 210.344 386.561 214.048 385.575C214.361 385.495 214.669 385.4 214.972 385.29C216.363 384.77 220.607 383.636 223.68 387.64C227.405 392.494 230.843 398.157 227.978 401.393C225.112 404.629 219.382 406.516 219.382 406.516L215.083 411.64C215.083 411.64 223.68 426.202 223.68 432.943C223.68 432.943 223.966 435.64 228.837 430.786C233.709 425.932 253.643 422.576 253.643 422.576C253.643 422.576 249.469 417.303 252.621 414.876C255.773 412.449 258.659 402.782 251.198 398.986L238.437 381.303L236.144 381.573C236.144 381.573 239.153 384.135 239.44 385.483C239.726 386.831 251.188 396.269 246.603 397.887C242.019 399.505 234.568 396 231.416 391.955C229.683 389.73 227.256 386.69 224.183 384.763C222.605 383.793 220.784 383.233 218.902 383.138C217.021 383.043 215.146 383.417 213.467 384.221L212.504 384.674C210.631 385.908 209.162 387.609 208.261 389.587L207.92 390.337L208.35 391.82Z" fill="#2F2E41"/>
            <path d="M227.262 367.551C234.225 367.551 239.87 362.238 239.87 355.685C239.87 349.133 234.225 343.82 227.262 343.82C220.298 343.82 214.654 349.133 214.654 355.685C214.654 362.238 220.298 367.551 227.262 367.551Z" fill="#2F2E41"/>
            <path d="M237.864 359.461C244.036 359.461 249.039 355.778 249.039 351.236C249.039 346.694 244.036 343.011 237.864 343.011C231.692 343.011 226.688 346.694 226.688 351.236C226.688 355.778 231.692 359.461 237.864 359.461Z" fill="#2F2E41"/>
            <path d="M233.709 367.281C234.737 367.281 235.571 365.892 235.571 364.18C235.571 362.467 234.737 361.079 233.709 361.079C232.68 361.079 231.846 362.467 231.846 364.18C231.846 365.892 232.68 367.281 233.709 367.281Z" fill="#A0616A"/>
            <path d="M230.557 336.906V358.382H237.147V336.906C237.147 336.523 236.986 336.155 236.698 335.884C236.41 335.613 236.019 335.461 235.612 335.461H232.093C231.685 335.461 231.295 335.613 231.007 335.884C230.719 336.155 230.557 336.523 230.557 336.906Z" fill="#FF6584"/>
            <path d="M233.852 369.438C237.808 369.438 241.016 366.42 241.016 362.697C241.016 358.973 237.808 355.955 233.852 355.955C229.896 355.955 226.688 358.973 226.688 362.697C226.688 366.42 229.896 369.438 233.852 369.438Z" fill="#6C63FF"/>
            <path d="M233.852 365.663C235.593 365.663 237.004 364.335 237.004 362.697C237.004 361.058 235.593 359.73 233.852 359.73C232.111 359.73 230.7 361.058 230.7 362.697C230.7 364.335 232.111 365.663 233.852 365.663Z" fill="#F2F2F2"/>
            <path d="M233.852 363.506C234.327 363.506 234.712 363.143 234.712 362.697C234.712 362.25 234.327 361.888 233.852 361.888C233.377 361.888 232.992 362.25 232.992 362.697C232.992 363.143 233.377 363.506 233.852 363.506Z" fill="#FF6584"/>
            <path opacity="0.1" d="M230.557 336.906V337.888H237.147V336.906C237.147 336.523 236.986 336.155 236.698 335.884C236.41 335.613 236.019 335.461 235.612 335.461H232.093C231.685 335.461 231.295 335.613 231.007 335.884C230.719 336.155 230.557 336.523 230.557 336.906Z" fill="black"/>
            <path d="M307.106 390.107L290.235 374.229C289.644 373.674 288.844 373.361 288.009 373.361C287.175 373.361 286.374 373.674 285.784 374.229L270.606 388.512C270.016 389.068 269.684 389.821 269.684 390.606C269.684 391.392 270.016 392.145 270.606 392.701L286.37 407.536C286.932 408.065 287.686 408.374 288.481 408.401C289.275 408.429 290.051 408.172 290.653 407.683L306.938 394.442C307.266 394.176 307.531 393.849 307.718 393.482C307.906 393.115 308.01 392.716 308.026 392.309C308.042 391.902 307.968 391.496 307.81 391.117C307.652 390.739 307.412 390.394 307.106 390.107V390.107Z" fill="#2F2E41"/>
            <path d="M302.337 392.629L287.579 378.741L275.401 390.202L289.585 403.55L302.337 392.629Z" fill="#F2F2F2"/>
            <path d="M288.582 397.648C292.477 397.648 295.634 394.676 295.634 391.011C295.634 387.346 292.477 384.374 288.582 384.374C284.688 384.374 281.53 387.346 281.53 391.011C281.53 394.676 284.688 397.648 288.582 397.648Z" fill="#6C63FF"/>
            <path opacity="0.1" d="M291.721 396.667C292.901 395.624 293.663 394.231 293.881 392.721C294.098 391.212 293.756 389.678 292.914 388.377C292.071 387.076 290.779 386.088 289.254 385.577C287.728 385.067 286.063 385.066 284.537 385.575C285.362 385.032 286.3 384.661 287.289 384.487C288.279 384.314 289.296 384.341 290.273 384.568C291.25 384.795 292.164 385.217 292.954 385.804C293.743 386.391 294.39 387.13 294.851 387.972C295.312 388.814 295.576 389.739 295.626 390.685C295.675 391.631 295.509 392.576 295.138 393.456C294.767 394.337 294.201 395.132 293.476 395.789C292.751 396.447 291.886 396.95 290.937 397.267C291.213 397.085 291.475 396.884 291.721 396.667V396.667Z" fill="black"/>
            <path d="M285.115 389.692C284.274 390.436 284.23 393.113 285.514 394.399C286.798 395.685 288.924 395.093 289.765 394.35C290.606 393.606 289.843 392.992 288.559 391.706C287.275 390.42 285.956 388.949 285.115 389.692Z" fill="#F2F2F2"/>
            <path d="M292.274 393.086C293.428 393.086 294.364 392.205 294.364 391.119C294.364 390.033 293.428 389.153 292.274 389.153C291.12 389.153 290.185 390.033 290.185 391.119C290.185 392.205 291.12 393.086 292.274 393.086Z" fill="#2F2E41"/>
            <path d="M288.518 389.324C289.672 389.324 290.608 388.443 290.608 387.357C290.608 386.271 289.672 385.391 288.518 385.391C287.364 385.391 286.429 386.271 286.429 387.357C286.429 388.443 287.364 389.324 288.518 389.324Z" fill="#2F2E41"/>
            <path d="M292.274 391.611C292.563 391.611 292.797 391.391 292.797 391.119C292.797 390.848 292.563 390.628 292.274 390.628C291.986 390.628 291.752 390.848 291.752 391.119C291.752 391.391 291.986 391.611 292.274 391.611Z" fill="#F2F2F2"/>
            <path d="M292.499 390.154C292.643 390.154 292.759 390.044 292.759 389.908C292.759 389.773 292.643 389.663 292.499 389.663C292.355 389.663 292.238 389.773 292.238 389.908C292.238 390.044 292.355 390.154 292.499 390.154Z" fill="#F2F2F2"/>
            <path d="M288.743 386.393C288.887 386.393 289.003 386.282 289.003 386.147C289.003 386.011 288.887 385.901 288.743 385.901C288.599 385.901 288.482 386.011 288.482 386.147C288.482 386.282 288.599 386.393 288.743 386.393Z" fill="#F2F2F2"/>
            <path d="M288.518 387.849C288.807 387.849 289.041 387.629 289.041 387.357C289.041 387.086 288.807 386.866 288.518 386.866C288.23 386.866 287.996 387.086 287.996 387.357C287.996 387.629 288.23 387.849 288.518 387.849Z" fill="#F2F2F2"/>
            <path d="M462.336 196.56V261.937C462.318 262.239 462.388 262.541 462.537 262.81C462.687 263.078 462.91 263.304 463.185 263.463C463.459 263.622 463.774 263.708 464.096 263.713C464.419 263.717 464.736 263.639 465.015 263.488L520.083 230.8C520.352 230.631 520.573 230.402 520.726 230.133C520.879 229.864 520.959 229.564 520.959 229.259C520.959 228.954 520.879 228.654 520.726 228.386C520.573 228.117 520.352 227.888 520.083 227.719L465.015 195.031C464.739 194.875 464.422 194.793 464.1 194.794C463.777 194.795 463.461 194.878 463.186 195.036C462.91 195.193 462.685 195.418 462.536 195.687C462.386 195.956 462.317 196.258 462.336 196.56V196.56Z" fill="#F2F2F2"/>
            <path d="M160.719 287.808L159.722 277.983L154.823 256.552L144.028 209.318L191.867 126.957L144.208 198.871L144.725 168.942L177.698 109.351L144.863 161.015L145.793 107.182L181.096 59.7437L145.944 98.7178L146.52 0.418103V0L146.502 0.423754L143.026 125.075L107.273 73.592L142.593 135.641L139.249 195.769L139.147 194.175L97.7688 139.76L139.021 199.814L138.607 207.329L138.529 207.447L138.565 208.063L127.974 256.552L121.406 286.616C121.478 287.707 121.544 288.795 121.604 289.882C127.626 290.006 156.732 289.803 160.671 289.842L160.719 287.808Z" fill="#3F3D56"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear" x1="229.5" y1="12" x2="18.5" y2="286" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2C21D9"/>
            <stop offset="1" stop-color="#FF0CC9"/>
            </linearGradient>
            <clipPath id="clip0">
            <rect width="562" height="470" fill="white"/>
            </clipPath>
            </defs>
            </svg>
    </div>
</div>
}

export default VideoScreen; 