/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCameraRetro } from 'react-icons/fa6';

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

export function Previews(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const thumbs = files.map((file) => (
        <div
            style={thumb}
            key={file.name}
        >
            <div style={thumbInner}>
                <Image
                    src={file.preview}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                    alt=''
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className="dropbox flex-auto">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className="bg-white border border-[#D0D5DD] rounded-lg flex-auto p-10 cursor-pointer">
                    <div className="flex flex-col gap-[6px] justify-center items-center text-center">
                        <button className="text-2xl text-[#DC2B2B] text-center">
                            <FaCameraRetro />
                        </button>
                        <p className="text-sm text-[#DC2B2B] font-medium">
                            ফটো আপলোড করুন
                        </p>
                    </div>
            <aside className='grid grid-cols-4 gap-3 pt-4'>{thumbs}</aside>
                </div>
            </div>
        </section>
    );
}


const Dropbox = () => {
  return (
    <Previews />
  )
}

export default Dropbox
