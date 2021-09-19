const URL = "https://teachablemachine.withgoogle.com/models/IO_h0PqNJ/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    $(".result-message").hide();
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);

    prediction.sort(
        (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    console.log(prediction[0].className);
    var resultTitle, resultExplain, resultCeleb, containerColor, wordCloudArray;

    //추가하고 싶으면 여기 바꿔~~^^
    switch (prediction[0].className) {
        case "Prada":
            resultTitle = "절제된 고급스러움, 인간 프라다";
            resultExplain =
                "심플함 속에 고급스러움이 느껴지는 당신. 미니멀한 디자인에 프라다 로고만으로 존재감을 압도하는 이탈리아 브랜드 프라다를 닮았네요.프라다를 입은 악마보다 더 프라다가 잘 어울리네요.";
            resultCeleb = "프라다 앰버서더 : 레드벨벳 아이린, EXO 찬열";
            break;
        case "Chanel":
            resultTitle = "클래식한 트렌디함, 인간 샤넬";
            resultExplain =
                "자유로우면서도 클래식한, 트렌디하면서도 우아한 매력의 당신. 1910년 코코 샤넬이 설립한 프랑스의 하이엔드 샤넬과 잘어울리네요. 시크한 당신의 매력을 표현해봐요";
            resultCeleb = "샤넬 앰버서더 : 블랙핑크 제니, 김고은, 이성경";
            break;
        case "Diol":
            resultTitle = "단아하지만 강인한 매력, 인간 디올";
            resultExplain =
                " 직선보다 곡선이, 시크함보다는 우아함이 잘어울리는 당신. 1947년 동명의 프랑스 디자이너가 파리에서 만든 럭셔리 브랜드 디올과 잘어울리네요. 청순하고 단아한 당신의 매력을 표현해봐요 ";
            resultCeleb = "디올 앰버서더: 수지, 블랙핑크 지수";
            // containerColor = "pink";
            break;
        case "Gucci":
            resultTitle = "톡톡 튀는 매력, 인간 구찌";
            resultExplain =
                "힙한 매력의 소유자인 당신. 1921년 구찌오 구찌가 설립한 럭셔리 이탈리아 브랜드 구찌가 잘어울리네요. 톡톡 튀는 당신만의 개성을 표현해봐요";
            resultCeleb = "구찌 앰버서더: 아이유, 엑소 카이";
            break;
        case "YSL":
            resultTitle = "모던 클래식, 인간 생로랑";
            resultExplain =
                "모던하면서도 시크한 분위기의 소유자인 당신, 1961년 프랑스 파리에서 설립한 브랜드 생로랑과 잘어울리네요. 당신만의 모던 시크한 매력을 뽐내봐요";
            resultCeleb = "생로랑 앰버서더: 블랙핑크 로제";
            break;
        case "Louis_vuitton":
            resultTitle = "당당함에서 나온 고급스러움, 인간 루이비통";
            resultExplain =
                "나다움이 제일 중요한 당신, 1854년에 세워진 프랑스의 하이엔드급 명품 브랜드 루이비통과 잘어울리네요. 깔끔하면서도 고급스러운 당신의 매력을 표현해봐요";
            resultCeleb = "루이비통 앰버서더: 배두나, 방탄소년단";
            break;
        case "Fendi":
            resultTitle =
                "부드러움과 강인함, 자신감 넘치는 애티튜드. 인간 펜디";
            resultExplain =
                "조곤조곤 할말 다할 것 같은 부잣집 사모님 같은 매력의 당신, 1925년에 설립된 이탈리아 하이앤드 명품 브랜드 펜디와 잘어울리네요.  자신감 넘치는 태도에서 나온 고급스러움을 표현해봐요";
            resultCeleb = "펜디 앰버서더 : 송혜교";
            break;
        default:
            resultTitle = "알수없음";
            resultExplain = "";
            resultCeleb = "";
    }

    var title =
        "<div class='" +
        prediction[0].className +
        "-animal-title'>" +
        resultTitle +
        "</div>";
    var explain =
        "<div class='animal-explain pt-2'>" + resultExplain + "</div>";
    var celeb =
        "<div class='" +
        prediction[0].className +
        "-animal-celeb pt-2 pb-2'>" +
        resultCeleb +
        "</div>";

    // if (containerColor) $(".container").css("background-color", containerColor);
    $(".result-message").html(title + explain + celeb);
    var barWidth;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth =
                Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = "4%";
        } else {
            barWidth = "2%";
        }
        var labelTitle;
        switch (prediction[i].className) {
            case "Prada":
                labelTitle = "프라다";
                break;
            case "Chanel":
                labelTitle = "샤넬";
                break;
            case "Diol":
                labelTitle = "디올";
                break;
            case "Gucci":
                labelTitle = "구찌";
                break;
            case "YSL":
                labelTitle = "생로랑";
                break;
            case "Louis_vuitton":
                labelTitle = "루이비통";
                break;
            case "Fendi":
                labelTitle = "펜디";
                break;
            default:
                labelTitle = "알수없음";
        }
        // var labelClass =
        //     "<div class=" +
        //     labelTitle +
        //     ">" +
        //     "</div>";
        var label =
            "<div class='animal-label d-flex align-items-center'>" +
            labelTitle +
            "  " +
            Math.round(prediction[i].probability.toFixed(2) * 100) +
            "%" +
            "</div>";
        var bar =
            "<div class='bar-container position-relative'><div class='" +
            // "<div class='bar-container position-relative container'><div class='" +
            prediction[i].className +
            "-box'></div><div class='d-flex justify-content-center align-items-center " +
            prediction[i].className +
            "-bar' style='width: " +
            barWidth +
            "'><span class='d-block percent-text'>" +
            "</span></div></div>";
        labelContainer.childNodes[i].innerHTML = label + bar;
    }

    // %로 바꾸고 보이게 하기!!!
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".image-upload-wrap").hide();

            $(".file-upload-image").attr("src", e.target.result);
            $(".container").css("padding", "30px");
            $(".file-upload-content").show();

            $(".image-title").html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
        $("#loading").show();
        init().then(function () {
            predict();
            $("#loading").hide();
            $(".result-message").show();
            $(".animal-label").show();
            $(".bar-container").show();
            $(".remove-image").show();
            $(".addthis_inline_share_toolbox_ofg8").show();
            // $("#wordCloud").show();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $(".file-upload-input").replaceWith($(".file-upload-input").clone());
    $(".file-upload-content").hide();
    $(".image-upload-wrap").show();
    $(".result-message").hide();
    $(".animal-label").hide();
    $(".bar-container").hide();
    $(".remove-image").hide();
    $("addthis_inline_share_toolbox_ofg8").hide();
    $(".file-upload-input").val("");
    $(".container").css("padding", "0px");
    // $("#wordCloud").hide();
    // $(".labelContainer").hide();
}
$(".image-upload-wrap").bind("dragover", function () {
    $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
    $(".image-upload-wrap").removeClass("image-dropping");
});
