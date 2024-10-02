import { HfInference } from "@huggingface/inference";
const hf = new HfInference("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");

let pageNumberImg = parseInt(Math.random()*10);
let pageNumberVideo = parseInt(Math.random()*20);
let perPageNumberVideo = parseInt(Math.random()*80);

const getImgPublication = async()=>{
    let request = await fetch(`https://api.unsplash.com/photos/?page=${ pageNumberImg }&per_page=10&client_id=DIbLocLN0AhLI5CcdWMwlPQVJBz8myKymj0_Mhfz3gw`);
    let requestToJSON = await request.json();
    return requestToJSON;
}
const getUserInfo = async()=>{
    let request = await fetch("https://randomuser.me/api/");
    let requestToJSON = await request.json();
    return requestToJSON;

}

const getVideo = async()=>{
    let request = await fetch(`https://api.pexels.com/videos/search?page=${ pageNumberVideo }&per_page=${ perPageNumberVideo }&query=games`, {
        method: 'GET',
        headers: {
            'Authorization': 'neDqnNX2TTgS7ioi7gtPNxvs1FLd28HU2tfpJa4g2Qh2Oo2fRHZ1uAAG'
        }
    });
    let requestToJSON = await request.json();
    return requestToJSON;

}

const determinateIfIsVerified = ()=>{
    let posibility = parseInt(Math.random()*200);
    if(posibility <= 100) return false;
    else return true 
}

const determinateRetweets = ()=>{
    let retweets = parseInt(Math.random()*200);
    return retweets;
}

const determinateLikes = ()=>{
    let likes = parseInt(Math.random()*200);
    return likes;
}


const generateDescription = async(description)=>{
    let finalDescription;
    try{
        let finalPrompt = `Escribe la descripción para mi publicación de Twitter sobre el siguiente tópico: ${description}`;
        const output = await hf.textGeneration({
        model: "bigscience/bloom",
        inputs: finalPrompt,
        parameters: {
            temperature: 1.2,          
            top_k: 40,                
            top_p: 0.85,              
            max_length: 150,         
            repetition_penalty: 1.5, 
            frequency_penalty: 0.6,   
            presence_penalty: 0.7,   
        },
    });
    finalDescription = output.generated_text.slice(finalPrompt.length).trim();
    } catch(e){
        console.log(e);
        finalDescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum neque, sunt voluptates magni id impedit deleniti nulla libero. Dolorum beatae, atque illum incidunt mollitia illo architecto enim officia perspiciatis veritatis."
    }
    return finalDescription;
}

export const getAllForPublication = async ()=>{
    let verify = determinateIfIsVerified();
    let retweets = determinateRetweets();
    let posibilityOfImgOrVideo = parseInt(Math.random()*100);
    let userInfo = await getUserInfo();
    let finalPublication  = {
        user: null,
        content: null,
        description: null,
        like: null,
        comments: null,
        type: null,
        isVerified: verify,
        retweets
    }
    if( posibilityOfImgOrVideo >= 50 && posibilityOfImgOrVideo <= 80){
        let imgInfo = await getImgPublication();
        finalPublication.type = "image";
        finalPublication.user = userInfo.results[0];
        let index = parseInt(Math.random()*imgInfo.length);
        finalPublication.content = imgInfo[index];
        let description = await generateDescription(imgInfo[index].alt_description);
        finalPublication.description = description;
        finalPublication.like = imgInfo[index].likes;
    }
    else if(posibilityOfImgOrVideo >= 10 && posibilityOfImgOrVideo < 50) {
        let videoInfo = await getVideo();
        finalPublication.type = "video";
        finalPublication.user = userInfo.results[0];
        let index = parseInt(Math.random()*videoInfo.videos.length);
        let description;
        if(videoInfo.videos[index].title){
            description = await generateDescription(videoInfo.videos[index].title);
        }
        else{
            description = await generateDescription("Video random sobre videojuegos");
        }
        let videoIndex = parseInt(Math.random()*videoInfo.videos[index].video_files.length)
        finalPublication.content = videoInfo.videos[index].video_files[videoIndex];
        finalPublication.description = description;
        finalPublication.like = determinateLikes();
    }
    else{
        finalPublication.user = userInfo.results[0];
        finalPublication.type = "text";
        finalPublication.description = await generateDescription("Cualquier tema");
        finalPublication.like = determinateLikes();
    }

    return finalPublication;
}