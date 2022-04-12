import { UploadFileOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { round } from "lodash";
import { useState } from "react"
import AnimateButton from 'ui-component/extended/AnimateButton';

export default function UploadExcel({ props }) {

    const [defaultApercu, setDefaultApercu] = useState("https://img.icons8.com/cute-clipart/64/000000/upload.png");
    const [apercu, setApercu] = useState("https://img.icons8.com/cute-clipart/64/000000/upload.png");
    const [apercuExcel, setApercuExcel] = useState("https://img.icons8.com/color/144/000000/microsoft-excel-2019--v1.png");
    const [defaultFileTitle, setDefaultFileTitle] = useState("Glissé deposer les contacts ou clicker pour uploader");
    const [fileTitle, setFileTitle] = useState("Glissé deposer les contacts ou clicker pour uploader");
    const [fileSize, setFileSize] = useState("");
    const [contactFile, setContactFile] = useState({})
    const [detectDrop, setDetectDrop] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)

    const handleDrop = (event) => {
        setDetectDrop(false)
        const data = event.dataTransfer.getData("text")
    }

    const allowDrop = (event) => {
        //event.preventDefault()
        setDetectDrop(true)
    }

    const handleUpload = (event) => {
        const convertionNumber = 1000
        const roundPrecision = 2;
        const acceptTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        const file = event.target.files[0];
        const sizeKo = round(file.size / convertionNumber, roundPrecision)
        const sizeMo = round(sizeKo / convertionNumber, roundPrecision)

        if (acceptTypes.includes(file.type)) {
            setContactFile(file)
            sizeKo > convertionNumber ? setFileSize(sizeMo + " Mo") : setFileSize(sizeKo + " Ko")
            setFileTitle(file.name)
            setApercu(apercuExcel)
            setFileSelected(true)
            return true
        } else {
            setFileTitle("")
            setApercu(defaultApercu)
            setFileSelected(false)
            setFileSize("")
            setFileTitle(defaultFileTitle)
            event.preventDefault()
            return false
        }

    }

    const endDrag = () => {
        setDetectDrop(false)
    }

    return (
        <div>
            <div>
                <div className={`dropZone ${detectDrop ? "droping" : ""}`} {...props}>
                    <div className={`draggable`} onDrop={handleDrop} onDragOver={allowDrop} onDragLeave={endDrag}>
                        <div className="dragApercu">
                            <img src={apercu} className="dragImg" />
                            <p className="dragTitle">{fileTitle}</p>
                            <p className="dragSize">{fileSize}</p>
                        </div>
                        <input type="file" className="fileDrag" onChange={handleUpload} accept=".xlsx, .xls" />
                        <label for="fileDrag" className="fileDragLabel">{fileSelected ? "Changer le fichier" : "Importer les contacts"}</label>
                    </div>
                </div>
            </div>
            <br />
            <div className="end">
                <AnimateButton>
                    <Button
                        disabled={!fileSelected}
                        disableElevation
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<UploadFileOutlined />}
                    >
                        Sauvegarder les contacts
                    </Button>
                </AnimateButton>
            </div>
        </div>
    )
}