// 新增
const increase = async () => {
    setDialog("increase");
    // 搜尋pid
    // 解構 物件裡ㄉ屬性拿出來 並宣告 再加冒號可以改宣告名字
    const { data: [{ pid: lastPid }] } = await axios.get("/backstage/product/increase");
    // 最後一個pid + 1 存到全域變數
    const newpid = (parseInt(lastPid) + 1).toString().padStart(6, 0);
    // 打開dialog
    setIncreaseForm();
    setSubmitBtn("increase", newpid);
    await myDialog.showModal();
};

const setIncreaseForm = () => {
    form_pName.value = "";
    form_category.value = "";
    form_unitPrice.value = "";
    form_inventory.value = 0;
    form_addInventory.value = 0;
    form_meaning.value = "";
    form_pImage.src = "";
};

const increaseSubmit = async (newpid) => {
    const formData = new FormData();
    formData.append("pid", newpid);
    formData.append("pName", form_pName.value);
    formData.append("category", form_category.value);
    formData.append("unitPrice", parseInt(form_unitPrice.value));
    formData.append("inventory", parseInt(form_inventory.value) + parseInt(form_addInventory.value));
    formData.append("meaning", form_meaning.value);
    formData.append("pImage", `${form_pName.value}.${form_pImageFile.files[0]?.type.split('/')[1]}`);
    formData.append("image", form_pImageFile.files[0]);
    const { status } = await axios({
        url: "/backstage/product/increase",
        method: "put",
        data: formData,
        transformRequest: [function (data, headers) {
            delete headers['Content-Type']
            return data
        }],
    });
    if (status === 200) location.reload();
    else {
        alert("發生錯誤，請再試一次");
        myDialog.close();
    };
};

// 更新
const modify = async (pid) => {
    setDialog();
    pid = pid.slice(6);
    await setModifyForm(pid);
    setSubmitBtn("modify", pid);
    await myDialog.showModal();
};

const setModifyForm = async (pid) => {
    const { data: [product] } = await axios.get(`/backstage/product/modify?pid=${pid}`);
    const { pName, pImage, category, unitPrice, inventory, meaning, key1, key2, key3 } = product;
    form_pName.value = pName;
    form_category.value = category;
    form_unitPrice.value = unitPrice;
    form_inventory.value = inventory;
    form_addInventory.value = 0;
    form_meaning.value = meaning;
    form_pImage.src = `/public/images/product/${pImage}`;
};

const modifySubmit = async (pid) => {
    const formData = new FormData();
    formData.append("pid", pid);
    formData.append("pName", form_pName.value);
    formData.append("category", form_category.value);
    formData.append("unitPrice", parseInt(form_unitPrice.value));
    formData.append("inventory", parseInt(form_inventory.value) + parseInt(form_addInventory.value));
    formData.append("meaning", form_meaning.value);
    formData.append("pImage", `${form_pName.value}.${form_pImageFile.files[0]?.type.split('/')[1]}`);
    formData.append("image", form_pImageFile.files[0]);
    const { status } = await axios({
        url: "/backstage/product/modify",
        method: "patch",
        data: formData,
        transformRequest: [function (data, headers) {
            delete headers['Content-Type']
            return data
        }]
    });
    if (status === 200) location.reload();
    else {
        alert("發生錯誤，請再試一次");
        myDialog.close();
    };
};

// 刪除
const deleteProduct = async (pid) => {
    setDialog("delete");
    pid = pid.slice(6);
    setSubmitBtn("delete", pid)
    myDialog.showModal();
};

const deleteProductSubmit = async (pid) => {
    const { status } = await axios.patch('/backstage/product/delete', { pid });
    await status === 200 ? location.reload() : alert("發生錯誤，請再試一次");
};

// 重新上架
const reshelveProductSubmit = async (pid) => {
    pid = pid.slice(8);
    const { status } = await axios.patch('/backstage/product/reshelve', { pid });
    if (status === 200) {
        alert("已重新上架");
        location.reload();
    } else alert("發生錯誤，請再試一次");
};

// dialog的按鈕
const setSubmitBtn = (which, pid = null) => {
    switch (which) {
        case "increase":
            submitBtn.onclick = () => increaseSubmit(pid);
            break;
        case "modify":
            submitBtn.onclick = () => modifySubmit(pid);
            break;
        case "delete":
            submitBtn.onclick = () => deleteProductSubmit(pid);
            break;
        case "reshelve":
            submitBtn.onclick = () => reshelveProductSubmit(pid);
            break;
    };
};

const setCancelBtn = () => {
    cancelBtn.onclick = () => myDialog.close();
};

const setDialog = (which) => {
    myDialog.innerHTML = which === "delete"
        ? `<p class="dialog__txt">確定要下架此商品嗎?</p>
            <button id="cancelBtn" class="dialog__btn">取消</button>
            <button id="submitBtn" class="dialog__btn">確定</button>`
        : `<form class="dialog__form">
                <div class="dialog__form-txtContainer">
                    <p class="dialog__form-txt">
                        <label>商品名稱：</label>
                        <input type="text" id="form_pName" class="dialog__form-ipt">
                    </p>
                    <p class="dialog__form-txt">
                        <label>分類：</label>
                        <input type="text" id="form_category" class="dialog__form-ipt">
                    </p>
                    <p class="dialog__form-txt">
                        <label>單價：</label>
                        <input type="number" id="form_unitPrice" class="dialog__form-ipt">
                    </p>
                    <p class="dialog__form-txt">
                        <label>庫存：</label>
                        <input type="number" id="form_inventory" disabled class="dialog__form-ipt">
                    </p>
                    <p class="dialog__form-txt">
                        <label>增加庫存：</label>
                        <input type="number" id="form_addInventory" class="dialog__form-ipt">
                    </p>
                    <p class="dialog__form-txt">
                        <label>花語：</label>
                        <input type="text" id="form_meaning" class="dialog__form-ipt">
                    </p>
                    <input type="file" id="form_pImageFile" name="pImageFile" class="dialog__form-txt">
                </div>
                <img class="dialog__form-img" id="form_pImage">
            </form>
            <button id="cancelBtn" class="dialog__btn">取消</button>
            <button id="submitBtn" class="dialog__btn">確定</button>`;
    previewImg("form_pImageFile", "form_pImage");
    setCancelBtn();
};

// 圖片
const previewImg = (uploadId, imgId) => {
    if (document.getElementById(uploadId))
        document.getElementById(uploadId).addEventListener('change', () => {
            const temp = URL.createObjectURL(document.getElementById(uploadId).files[0]);
            document.getElementById(imgId).src = temp;
        })
};

// const imgToBase64 = (target, func) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(target);
//     reader.onload = (e) => func(e.target.result);
// };

// 輸入框不為空
// const inputRequired = (inputIdsArr) => {
//     if (Array.isArray(inputIdsArr)) {
//         for (const item of inputIdsArr) {
//             const ipt = document.getElementById(item).value;
//             if (ipt === "" || ipt == null) return false;
//         }
//         return true;
//     } else console.log('inputRequired發生錯誤')
// };


// 新增
increaseBtn.onclick = increase;

// 更新
const modifyBtns = Array.from(document.getElementsByClassName('modifyBtn'));
for (const item of modifyBtns) {
    item.onclick = () => modify(item.id);
};

// 刪除
const deleteBtns = Array.from(document.getElementsByClassName('deleteBtn'));
for (const item of deleteBtns) {
    item.onclick = () => deleteProduct(item.id);
};

// 重新上架
const reshelveBtns = Array.from(document.getElementsByClassName('reshelveBtn'));
for (const item of reshelveBtns) {
    item.onclick = () => reshelveProductSubmit(item.id);
};