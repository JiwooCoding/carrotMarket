const previewImage = (e:any, setImagePreview:any, setImage:any) => {
    
    //console.log(e.target.files[0]);

    //file => url로 변경
    const file = e.target.files[0];
    setImage(file);

    //preview
    const reader = new FileReader();
    if(file){
        reader.readAsDataURL(file);
    }
    
    //load가 끝날 시
    reader.onloadend = () => {
        console.log(reader.result);
        setImagePreview(reader.result);
    }
}

export default previewImage;


