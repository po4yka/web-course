# Задача 1

1. Смотрим текущую директорию: `pwd`

2. Переходим в корневую папку: `cd /`

3. Ищем, где же у нас файл конфигурации: `find / -name nginx`

    Получаем кучу Permission denied и следующие адреса:

    ```
    /usr/share/nginx                                                                
    /usr/share/doc/nginx                                                            
    /usr/sbin/nginx                                                                 
    /etc/default/nginx                                                              
    /etc/nginx
    /var/log/nginx
    /var/lib/nginx
    ```

4. Через `find / -name www` ищем и находим папку с html: `/var/www`

5. Открываем файл: `/var/www/html/index.nginx-debian.html`

6. Приводим его к следующему виду:

```html
<!DOCTYPE html>                                                                 
<html>                                                                          
<head>                                                                          
<title>Welcome to nginx!</title>                                                
<style>                                                                         
    body {                                                                      
        width: 35em;                                                            
        margin: 0 auto;                                                         
        font-family: Tahoma, Verdana, Arial, sans-serif;                        
    }                                                                           
</style>                                                                        
</head>                                                                         
<body>                                                                          
test                                                                            
</body>                                                                         
</html>
```

# Задача 2

> Хмм...
> ```
> /etc/nginx/sites-available/default                                              
> /etc/nginx/sites-enabled/default
> ```

1. Открываем файл `/etc/nginx/sites-enabled/default`

2. Меняем 36 строку на `root /home/box/html;`

3. Перезагружаем сервер: `sudo nginx -s reload`

