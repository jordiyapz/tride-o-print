# Tride-O-Print
Tubes mata kuliah Model Bisnis Digital semester 4

# Backend
Jalankan dengan cara membuka terminal di direktori backend, kemudian ketik "npm start"
Ketikkan "localhost:7000" di alamat url di browser anda

### Dokumentasi:
```
1.  url: "/v1/user",
    method: "GET",
    require: {},
    Desc: "Menampilkan semua user yang terdaftar",
    Level-Akses: "All",
    Ex: "localhost:7000/v1/user"
    
2.  url: "/v1/customer/signup",
    method: "POST",
    require: {
        body: {
            username: String,
            email: String,
            password: String,
            phoneNumber: String
        },
        headers: {
            Content-Type: "application/json"
        }
    },
    Desc: "Signup user sebagai customer. Digunakan untuk user yang belum pernah daftar",
    Level-Akses: "All",
    Ex: "localhost:7000/v1/customer/signup"
    
3.  url: "/v1/customer/signup/existing",
    method: "POST",
    require: {
        input: String,
        password: String
    },
    Desc: "Signup user sebagai customer. Digunakan untuk user yang sudah terdaftar. Misalnya sebagai admin atau penjual atau pencetak.",
    Level-Akses: "All",
    Ex: "localhost:7000/v1/customer/login"
    
4.  url: "/v1/customer/login",
    method: "POST",
    require: {
        body: {
            input: String,            
            password: String           
        },
        headers: {
            Content-Type: "application/json"
        }
    },
    Desc: "Login user sebagai customer. Digunakan untuk user yang sudah terdaftar.",
    Level-Akses: "All",
    Ex: "localhost:7000/v1/customer/signup/existing"
    
5.  url: "/v1/user/:userId",
    method: "GET",
    require: {},
    Desc: "Menampilkan data user dengan id: userId",
    Level-Akses: "All",
    Ex: "localhost:7000/v1/user/5cac26486d15e04288ef4d52"
    
6.  url: "/v1/user",
    method: "POST",
    require: {
        body: {
            username: String,
            email: String,
            password: String,
            phoneNumber: String,
            [birthDate: Date], //format: yyyy-mm-dd
            ...
        },
        headers: {
            Content-Type: "application/json"
            Authentication: "Bearer \<token\>"
        }
    },
    Desc: "Menambahkan user secara paksa",
    Level-Akses: "Admin",
    Ex: "localhost:7000/v1/user"
    
7.  url: "/v1/user/:userId",
    method: "PUT",
    require: {
        body: {
            username: String,
            email: String,
            password: String,
            phoneNumber: String,
            [birthDate: Date], //format: yyyy-mm-dd
            ...
        },
        headers: {
            Content-Type: "application/json"
            Authentication: "Bearer \<token\>"
        }
    },
    Desc: "Menimpa data user secara dengan id: userId",
    Level-Akses: "User",
    Ex: "localhost:7000/v1/user/5cac26486d15e04288ef4d52"
    
8.  url: "/v1/user/:userId",
    method: "DELETE",
    require: {
        headers: {
            Authentication: "Bearer \<token\>"
        }
    },
    Desc: "Menghapus data user dengan id: userId",
    Level-Akses: "User",
    Ex: "localhost:7000/v1/user/5cac26486d15e04288ef4d52"
```
# Tutorial inisialisasi GIT:
1. Install git
2. Buat folder untuk project
3. Dalam folder tersebut, jalankan git (klik kanan, pilih git bash here, atau dengan cmd, buka folder tersebut)
4. ketik "git init" tanpa kutip
5. Ketik "git remote add origin \<link repo git\>". Link reponya: https://github.com/jordiyapz/TUBES-MBD.git
6. Ketik "git pull origin master"
7. Ketik "git checkout -b \<nama anda\>"
8. Selamat ngoding

# Tutorial ngodingnya:
1. Biasakan ketik "git pull origin master" terlebih dahulu
2. Setelah itu tinggal ngoding. Kalau sudah selesai, lanjut ke upload kodingan.

# Tutorial upload kodingan GIT:
1. Pastikan ada berada di branch sendiri (nama anda)
2. Ketik "git add . " untuk men-stage semua file, atau cukup ketik "git add <nama file>" untuk men-stage file yang ingin di upload
3. Ketik 'git commit -m "\<pesan\>"'. Isi saja "pesan" dengan "update <tanggal>-<bulan>-<tahun>"
4. Ketik "git pull origin master"
5. Ketik "git push origin \<nama anda\>". Pastikan anda menggunakan nama anda.
