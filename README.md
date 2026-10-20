# Yükselen Filizler

Yükselen Filizler, çalışanların fikir ve önerilerini kurumsal bir form üzerinden paylaşabilmesi için hazırlanmıştır. Backend sunucusu, veritabanı veya JavaScript framework'ü kullanmaz. Form kayıtları Google Apps Script aracılığıyla Google Sheets'e aktarılır ve yönetici e-posta bildirimi Apps Script tarafından oluşturulur.

## Formu açma

Proje klasöründeki `index.html` dosyasına çift tıklayın. Sayfa doğrudan `file://` üzerinden açılabilir. Projeyi başka bir bilgisayara gönderirken yalnızca HTML dosyasını değil, bütün klasörü ZIP olarak paylaşın.

## Google Apps Script bağlantısı

Dağıtılmış Apps Script web uygulamasının adresi `/exec` ile bitmelidir. Adresi yalnızca `js/config.js` dosyasındaki aşağıdaki alana yazın:

```javascript
appsScriptUrl: "BURAYA_GOOGLE_APPS_SCRIPT_EXEC_URL",
```

Örnek biçim:

```text
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Gerçek adres girilmediği sürece sayfada yapılandırma uyarısı görünür ve form gönderilmez. Google hesabı şifresi, API anahtarı veya OAuth bilgisi frontend dosyalarına yazılmamalıdır.

## Gönderilen parametreler

| Form alanı | Apps Script parametresi |
|---|---|
| Ad Soyad | `adSoyad` |
| Bağlı Olunan Departman | `departman` |
| Fikrin İlgilendirdiği Departman | `ilgiliDepartman` |
| Önerilen Çözüm / Fikir | `cozum` |
| Beklenen Kazanımlar | `kazanimlar` |

`problem` parametresi gönderilmez. Apps Script içindeki `doPost(e)` fonksiyonu bu parametreleri `e.parameter` üzerinden okumalıdır. Tarih ve başlangıç durumunun (`Yeni`) Apps Script tarafından oluşturulması beklenir.

## Form alanları

- Ad soyad — zorunlu, en az iki kelime
- Bağlı olunan departman — zorunlu
- Fikrin ilgili olduğu departman veya süreç — zorunlu
- Önerilen çözüm veya fikir — zorunlu, en az 100 ve en fazla 5000 karakter
- Beklenen kazanımlar — zorunlu serbest metin, en fazla 2000 karakter
- Gizlilik onayı — zorunlu

Departman seçenekleri `js/config.js` içindeki `departments` listesinden yönetilir. Aynı liste iki departman alanında da kullanılır.

## Gönderim davranışı

Form, `application/x-www-form-urlencoded` biçimindeki standart HTML `POST` gönderimini kullanır. Yanıt yeni sekmede açılır. Bu yöntem, yerel `file://` sayfalarında Apps Script'in CORS ve yönlendirme davranışına karşı `fetch` kullanmaktan daha uygundur.

Frontend gönderimin gerçek sonucunu güvenilir biçimde okuyamadığı için otomatik “başarıyla gönderildi” mesajı göstermez ve form alanlarını otomatik temizlemez. Sonuç şu noktalardan kontrol edilmelidir:

1. Yeni sekmedeki Apps Script yanıtı
2. Google Sheets'e eklenen kayıt
3. Yönetici e-posta bildirimi

E-posta gönderimi başarısız olsa bile Sheets kaydı oluşmuş olabilir. Kullanıcıya yeniden gönderim yaptırmadan önce Sheets kaydı kontrol edilmelidir; aksi hâlde aynı başvuru birden fazla kez kaydedilebilir.

## Google Sheets sütunları

Apps Script aşağıdaki yapıyı kullanabilir:

1. Tarih
2. Ad Soyad
3. Bağlı Departman
4. İlgili Departman
5. Önerilen Çözüm
6. Beklenen Kazanımlar
7. Durum

Problem alanı kaldırıldığı için mevcut Apps Script ve Sheets yapısında problem sütunu bulunuyorsa backend tarafında da uyarlanmalıdır. Frontend boş veya sahte bir problem değeri üretmez.

## Güvenlik ve spam

- Google Sheets dosyasını herkese açık hâle getirmeyin.
- Herkese açık Apps Script `/exec` adresleri otomatik ve istenmeyen gönderimlere maruz kalabilir.
- Apps Script tarafında alan doğrulaması, uzunluk sınırları, oran sınırlaması veya tekrar gönderim kontrolü uygulanması önerilir.
- İstemci tarafındaki doğrulama tek başına güvenlik önlemi değildir.
- Kullanıcı girdileri HTML olarak çalıştırılmamalıdır.
- Formdaki gizlilik metni şirketin hukuk/KVKK birimi tarafından onaylanmalıdır.

## Tasarım ve logo

Sayfa mevcut yeşil gradient hero, beyaz form kartı, yerel SVG ikonları ve responsive düzeni korur. Kullanılan resmî logo:

```text
assets/logos/Yüksel Logo -.svg
```

## Dosya yapısı

```text
index.html
assets/
  logos/
    Yüksel Logo -.svg
css/
  variables.css
  reset.css
  base.css
  layout.css
  header.css
  form.css
  components.css
  responsive.css
js/
  config.js
  utils.js
  notifications.js
  validation.js
  form.js
  main.js
README.md
```
