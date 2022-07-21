import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone'
import config from "../../../config";
// import cloudinary from "cloudinary/lib/cloudinary";

import { AddressButton, BackButton, PrimaryButton } from "../../../components/Buttons";
import AddressImg from "../../../assets/img/address.png";
import GalleryImg from "../../../assets/img/auth/gallery.png";
console.log("config.CLOUD_NAME", config.CLOUD_NAME);

// cloudinary.config({
//   cloud_name: config.CLOUD_NAME,
//   api_key: config.API_KEY,
//   api_secret: config.API_SECRET
// });

const UserPic = (props) => {
  const [files, setFiles] = useState(null);
  const [imageData, setImageData] = useState([]);

  const uploadImage = async (files) => {
    let images = []
    files.forEach(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", config.PRESET_NAME);
      data.append("cloud_name", config.CLOUD_NAME);
      data.append("folder", "assets/avatars");
      try {
        const resp = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`, data);
        console.log(resp)
        images.push({ url: resp.data.url, public_id: resp.data.public_id, title: resp.data.original_filename })
        setImageData([...images]);
      } catch (err) {
        console.log("errr : ", err);
      }
    });
  }

  return (
    <div className="h-full pr-[0]">
      <div className="relative w-auto my-6 mx-auto h-full">
        {/*content*/}
        <div className="rounded-[30px] shadow-lg relative flex flex-col w-full h-full bg-[#141416] outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between pt-8 pl-[32px] pr-[32px] lg:p-14 lg:pb-0 lg:pr-12 rounded-t">
            <h3 className="text-[28px] lg:text-[30px] text-white font-medium tracking-[0.02em]">
              Choose profile picture
            </h3>
            <AddressButton caption={""} icon={AddressImg} onClick={null} />
          </div>
          <div className="relative p-[32px] lg:p-14 flex-auto">
            <div className="mb-10">
              <Dropzone onDrop={acceptedFiles => { uploadImage(acceptedFiles); }}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <label
                      className="flex w-full h-24 px-4 transition bg-transparent border-2 border-white/20 border-dashed rounded-md appearance-none cursor-pointer hover:border-white/30 focus:outline-none">
                      <span className="flex items-center space-x-2 mr-3">
                        <img src={GalleryImg} />
                      </span>
                      <span className="flex items-center space-x-2">
                        {files ? <span className="font-medium text-[#f3f3f3]">
                          <label className="text-primary">{files.length}</label> file&#40;s&#41; selected
                          <br></br>
                          <label className="text-[14px] text-white/30">Supports&#58; JPEG, JPEG2000, PNG</label>
                        </span> : <span className="font-medium text-[#f3f3f3]">
                          Drop image here or&nbsp;<label className="text-primary">browse</label>
                          <br></br>
                          <label className="text-[14px] text-white/30">Supports&#58; JPEG, JPEG2000, PNG</label>
                        </span>}
                      </span>
                    </label>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="overflow-scroll">
              {/* {
                nftLoading ?
                  <h3 className="text-center text-[24px] lg:text-[26px] text-white font-medium tracking-[0.02em]">
                    Loading NFTs...
                  </h3>
                  :
                  <div className="grid grid-cols-2 xl:grid-cols-3 mt-5 max-h-[35vh]">
                    {
                      nfts.map(({ type, mintAddress, contractAddress, tokenId, name, image, collectionName }, index) => (
                        <div className="p-2" key={index}>
                          <NftPanel
                            image={image}
                            name={name}
                            collectionName={collectionName}
                            type={type}
                            key={index}
                            selected={(() => {
                              if (!selectedNft || !selectedNft.imageNetwork) return false;
                              if (selectedNft.imageNetwork === "Ethereum") {
                                return (
                                  selectedNft.tokenId == tokenId &&
                                  selectedNft.contractAddress == contractAddress
                                );
                              }
                              return selectedNft.mintAddress == mintAddress;
                            })()}
                            onClick={() => {
                              setAvatar(image)
                              setSelectedNft({
                                imageNetwork: type,
                                mintAddress,
                                contractAddress,
                                tokenId,
                              });
                            }}
                          />
                        </div>
                      ))
                    }
                  </div>
              } */}
              {/* <div className="grid grid-cols-2 xl:grid-cols-3 mt-5 max-h-[35vh]">
                {
                  imageData.map((image, index) => (
                    <div className="p-2" key={index}>
                      <AvatarPanel
                        imageUrl={image.url}
                        title={image.title}
                        onClick={() => {
                          setAvatar(image.url)
                          setSelectedAvatar(image)
                        }}
                        selected={image == selectedAvatar}
                      />
                    </div>)
                  )
                }
              </div> */}
            </div>
          </div>
          <div className="w-full p-[32px] lg:p-14 flex-auto flex items-end px-[32px] py-[32px] lg:px-14 lg:py-8">
            <div className="inline-block w-[20%] pr-2">
              <BackButton onClick={() => {}} styles="rounded-[15px]" />
            </div>
            <div className="inline-block w-[80%] pl-2">
              <PrimaryButton caption="Complete" icon="" bordered={false} onClick={() => {}} disabled={false} styles="rounded-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPic;