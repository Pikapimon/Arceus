# utf8
from email.header import Header
from email.mime.text import MIMEText
import smtplib


'''
发送文件函数
1、发送邮箱为163注册的pikapimon@163.com
2、参数说明（目标收信人(pkClient),发送的邮件内容(str)）
'''


class pkClient:
    def __init__(self, name, email):
        self.name = name
        self.email = email


def email(receiver, content):
    message = MIMEText(content, 'html', 'utf-8')
    message['From'] = 'pikapimon@163.com'
    message['To'] = receiver.email
    message['Subject'] = Header('From Arceus', 'utf-8')
    ''' 链接并发送'''
    mail_host = "smtp.163.com"  # 设置服务器
    mail_user = "pikapimon"  # 用户名
    mail_pass = "YDPLIGNLDMJOPUYS"  # 口令
    sender = 'pikapimon@163.com'
    try:
        smtpObj = smtplib.SMTP_SSL(mail_host, 465)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receiver.email, message.as_string())
        print("邮件发送成功")
    except smtplib.SMTPException as e:
        print(e)


def email_html(receiver):
    html = open('mail_content.html', 'rb').read()
    content = str(html, 'utf-8')

    message = MIMEText(content, 'html', 'utf-8')
    message['From'] = 'pikapimon@163.com'
    message['To'] = receiver.email
    message['Subject'] = Header('From Arceus', 'utf-8')
    ''' 链接并发送'''
    mail_host = "smtp.163.com"  # 设置服务器
    mail_user = "pikapimon"  # 用户名
    mail_pass = "YDPLIGNLDMJOPUYS"  # 口令
    sender = 'pikapimon@163.com'
    try:
        smtpObj = smtplib.SMTP_SSL(mail_host, 465)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receiver.email, message.as_string())
        print("邮件发送成功")
    except smtplib.SMTPException as e:
        print(e)


if __name__ == '__main__':
    cos_grop = [pkClient('宋文凯', '781509214@qq.com')]
    html = open('mail_content.html', 'rb').read()
    html = str(html, 'utf-8')
    for cos in cos_grop:
        content = html.replace('%s1', cos.name)
        content = content.replace('%s2', cos.email)
        content = content.replace('%s3', '321281199907285178')
        content = content.replace('%s4', '18861060817')
        email(cos, content)
