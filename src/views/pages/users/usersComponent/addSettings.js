import { useState } from "react";
import { TextField, Button } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setChamp } from "store/Action/champ.action";
import { random } from 'lodash';

export default function AddSettings() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [nbChamp, setNbChamp] = useState(1)

    const applyChamp = () => {
        let key = random(2344, 99999)
        let champKey = [nbChamp, key]
        dispatch(setChamp(champKey))
        setNbChamp(1)
    }

    return (
        <div>
            <div className="customNb">
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        if (nbChamp !== 1) {
                            setNbChamp(nbChamp - 1)
                        }
                    }}
                    className="nbBtn"
                >-</Button>
                <TextField
                    label="Contact number"
                    margin="normal"
                    name="prenom"
                    type="number"
                    variant="standard"
                    value={nbChamp}
                    sx={{ ...theme.typography.customInput }}
                    onChange={(e) => setNbChamp(parseInt(e.target.value))}
                    style={{

                    }}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setNbChamp(nbChamp + 1)}
                    className="nbBtn"
                >+</Button>
            </div>
            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={applyChamp}
            >add</Button>
        </div>
    )
}