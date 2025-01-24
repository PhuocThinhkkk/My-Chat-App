1. useState không tái render lại room khác mặc dù console.log room thay đổi.
=> mỗi Chat cần có 1 key unique. 

2. khi render các message có uid giống auth.current.uid nhưng cũng thành ortherMessage.
=> do có các message khác không có trường uid.

3. khi parse JSON bị lỗi.
=> Nếu bạn đang dùng một thư viện như js-cookie, khi gọi cookies.get(), giá trị cookie có thể đã được tự động parse thành object. Đó là lý do giá trị in ra trong console của bạn không phải chuỗi JSON mà là object JavaScript.

4. toDate() bị lỗi vì đọc một giá trị thời gian null.
=> do sự bất đồng bộ, fire store chưa tải thời gian xong mà đã hiện.

