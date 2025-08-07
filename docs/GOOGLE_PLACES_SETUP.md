# 🗺️ Hướng dẫn setup Google Places API

## 📋 Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Đặt tên project (ví dụ: "whattoeat-restaurants")

## 🔑 Bước 2: Enable Google Places API

1. Trong Google Cloud Console, vào **APIs & Services** > **Library**
2. Tìm kiếm "Places API"
3. Click vào **Places API** và bấm **Enable**

## 🎫 Bước 3: Tạo API Key

1. Vào **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy API key được tạo

## 🔒 Bước 4: Bảo mật API Key (Quan trọng!)

1. Click vào API key vừa tạo
2. Trong **Application restrictions**, chọn **HTTP referrers**
3. Thêm domain của bạn:
   - `localhost:5173/*` (cho development)
   - `yourdomain.com/*` (cho production)
4. Trong **API restrictions**, chọn **Restrict key**
5. Chỉ chọn **Places API**

## ⚙️ Bước 5: Cập nhật code

1. Mở file `src/hooks/useGoogleMaps.ts`
2. Thay thế `YOUR_GOOGLE_PLACES_API_KEY` bằng API key thật:

```typescript
const GOOGLE_PLACES_API_KEY = 'AIzaSyC...'; // Your actual API key
```

## 🚀 Bước 6: Test

1. Chạy ứng dụng: `npm run dev`
2. Bấm "🍽️ Quán ăn"
3. Bấm "Tìm quán ăn gần đây"
4. Kiểm tra console để xem API calls

## 💰 Chi phí

- **Google Places API**: Miễn phí cho 1000 requests/tháng
- **Sau đó**: $0.017 cho mỗi 1000 requests
- **Ước tính**: Khoảng $1-5/tháng cho ứng dụng nhỏ

## 🔧 Troubleshooting

### Lỗi "REQUEST_DENIED"
- Kiểm tra API key có đúng không
- Đảm bảo Places API đã được enable
- Kiểm tra domain restrictions

### Lỗi "OVER_QUERY_LIMIT"
- Đã vượt quá quota miễn phí
- Cần upgrade billing account

### Lỗi "ZERO_RESULTS"
- Không có quán ăn trong bán kính 5km
- Thử tăng radius hoặc di chuyển vị trí

## 📱 Fallback Strategy

Nếu không có API key hoặc API fail:
- Ứng dụng sẽ tự động dùng mock data
- Vẫn hoạt động bình thường
- Hiển thị thông báo trong console

## 🔄 Alternative APIs

Nếu không muốn dùng Google Places API:

1. **Foursquare Places API**
2. **Yelp Fusion API**
3. **OpenTripMap API**
4. **Here Places API**

Mỗi API có cách setup khác nhau, nhưng logic tương tự. 