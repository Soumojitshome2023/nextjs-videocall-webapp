const copyToClipboard = (valueToCopy, setIsJustCopied) => {
  setIsJustCopied(true);
  navigator?.clipboard?.writeText(valueToCopy).then(() => {
    console.log("Copy Successfull");
  }).catch((error) => {
    console.error("Failed to Copy text: ", error);
    setIsJustCopied(false);
  });
  setTimeout(() => setIsJustCopied(false), 4e3);
};

export { copyToClipboard };
//# sourceMappingURL=helpers.mjs.map
