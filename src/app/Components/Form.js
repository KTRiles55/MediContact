"use client"

import { useState } from 'react';

export default function Form() {
    const [loadForm, setLoadForm] = useState(false);

    //handle submit here

    return (
        <div>
            { loadForm &&(
                <div>This is a form.</div>
            )
            }
        </div>
    )
}



