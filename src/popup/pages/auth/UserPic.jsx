import React, { createRef, useCallback, useEffect, useState } from "react";
import Dropzone from 'react-dropzone'
import { create } from 'ipfs';
import toBuffer from 'blob-to-buffer';
import { Buffer } from "buffer";
import async from 'async';

import { AddressButton, BackButton, PrimaryButton } from "../../components/Buttons";
import { minifyAddress, parseName } from "../../utils";

import AddressImg from "../../../assets/img/address.png";
import GalleryImg from "../../../assets/img/auth/gallery.png";
import AvatarPanel from "../../components/Panels/AvatarPanel";
import { getNfts } from "../../hooks";
import { useSelector } from "react-redux";
import NftPanel from "../../components/Panels/NFTPanel";
import { useDispatch } from "react-redux";
import { setPageStages, registerAction } from "../../redux/slices/authSlice";

var ipfs = window.ipfs;
window.Buffer = Buffer;

const UserPic = (props) => {
  const [images, setImages] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropzoneRef = createRef();
  const dispatch = useDispatch();

  const { profileData, publicKey, domain, walletType, bio } = useSelector((state) => ({
    profileData: state.auth.profile,
    walletType: state.auth.walletType,
    publicKey: state.auth.publicKey,
    domain: state.auth.registration.domain,
    bio: state.auth.registration.bio
  }));

  const [nfts, nftLoading, nftError, fetchNFTs] = getNfts(
    domain,
    publicKey,
    true
  );

  const rootProps = {
    onClick: (e) => {
      if (props.dropOnly) e.stopPropagation();
    }
  }

  useEffect(() => {
    fetchNFTs();
  }, [])

  useEffect(() => {
    if (!ipfs && !window.ipfs && !props.ipfs) {
      console.debug("=> IPFS Dropzone: Creating IPFS node")
      async function initIPFS() {
        ipfs = await create({ repo: 'ok' + Math.random() })
        setActive(true);
        window.ipfs = ipfs;
        console.debug("=> IPFS Dropzone: IPFS node created")
      }
      initIPFS()
    } else if (window.ipfs && !ipfs) {
      console.debug("=> IPFS Dropzone: Reusing open IPFS node")
      ipfs = window.ipfs;
      setActive(true);
    }
  }, [window.ipfs, props.ipfs])

  useEffect(() => {
    if (selectedAvatar && selectedNft)
      setSelectedAvatar(null);
  }, [selectedNft])

  useEffect(() => {
    if (selectedAvatar && selectedNft)
      setSelectedNft(null);
  }, [selectedAvatar])

  const onDrop = (files) => {
    if (files && files.length > 0) {
      if (props.onLoadStart) props.onLoadStart(files.map((x) => parseName(x.name)));
      async.map(files, (file, cb) => {
        setLoading(true);
        toBuffer(file, async (err, buff) => {
          if (err) return cb(err)
          if (!ipfs) { setLoading(false); return; }
          ipfs.add(buff).then((result) => {
            setLoading(false);
            setImages([...images, { url: 'https://ipfs.io/ipfs/' + result.path }]);
            console.debug("=> IPFS Dropzone added: ", result.cid.string)
            let _file = parseName(file.name)
            cb(null, { ..._file, cid: result.cid.string })
          })
        })
      }, (err, results) => {
        if (err) return console.error("=> IPFS Dropzone: IPFS Upload Error: ", err)
        if (props.onLoad) props.onLoad(results)
      })
    }
  }

  const cancelUserPic = () => {
    setSelectedAvatar(null);
    setSelectedNft(null);
    dispatch(setPageStages(1));
  }

  const register = () => {
    if (!selectedAvatar && !selectedNft) {
      alert('Select a item for profile image please.')
    }
    var profileImage = {};
    if (selectedAvatar) {
      profileImage.link = selectedAvatar.url;
    } else {
      profileImage = selectedNft;
    }
    dispatch(registerAction({ profileImage, publicKey, walletType, domain, bio }))
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
            <AddressButton caption={minifyAddress(publicKey, 3)} icon={AddressImg} onClick={null} />
          </div>
          <div className="relative p-[32px] pb-0 lg:p-14 flex-auto">
            <div className="mb-5">
              <Dropzone ref={dropzoneRef} onDrop={onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()} {...props}>
                    <input {...getInputProps()} />
                    <label
                      className="flex w-full h-24 px-4 transition bg-transparent border-2 border-white/20 border-dashed rounded-md appearance-none cursor-pointer hover:border-white/30 focus:outline-none">
                      <span className="flex items-center space-x-2 mr-3">
                        <img src={GalleryImg} />
                      </span>
                      <span className="flex items-center space-x-2">
                        {images ? <span className="font-medium text-[#f3f3f3]">
                          <label className="text-primary">{images.length}</label> file&#40;s&#41; selected
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
            <div className="overflow-scroll h-[322px]">
              {
                nftLoading ?
                  <h3 className="text-center text-[24px] lg:text-[26px] text-white font-medium tracking-[0.02em]">
                    Loading NFTs...
                  </h3>
                  :
                  <div className="grid grid-cols-2 xl:grid-cols-3 mt-5">
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
              }
              <div className="grid grid-cols-2 xl:grid-cols-3 mt-5 max-h-[35vh]">
                {
                  images.map((image, index) => (
                    <div className="p-2" key={index}>
                      <AvatarPanel
                        imageUrl={image.url}
                        onClick={() => {
                          setSelectedAvatar(image)
                        }}
                        selected={image == selectedAvatar}
                      />
                    </div>)
                  )
                }
              </div>
            </div>
          </div>
          <div className="w-full p-[32px] lg:p-14 flex-auto flex items-end px-[32px] py-[32px] lg:px-14 lg:py-8">
            <div className="inline-block w-[20%] pr-2">
              <BackButton onClick={cancelUserPic} styles="rounded-[15px]" />
            </div>
            <div className="inline-block w-[80%] pl-2">
              <PrimaryButton caption="Complete" icon="" bordered={false} onClick={register} disabled={false} styles="rounded-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPic;