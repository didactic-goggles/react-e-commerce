import React from 'react';

const Kurumsal = () => {
  console.log('Rendering => Kurumsal');
  return (
    <div className="container py-4">
      <div className="text-center mb-3">
        <img
          src="https://comfortmedikal.com/img/logo/comfort-logo-transparent.png"
          alt="Comfort Medikal İstanbul"
          className="w-50"
        />
      </div>
      <p
        className="lead"
        ref={(node) => {
          if (node) {
            node.style.setProperty('text-transform', 'none', 'important');
          }
        }}
      >
        Firmamız 2005 yılında kurulmuş olup spesifik olarak sadece SKL, MS,
        SPİNA BİFİDA vs hastalıklara bağlı nörojen mesane veya üretra darlığı
        olan ve jelli sonda kullanan tüm hastalara hizmet vermektedir.
        <br></br>
        <br></br>
        2010 yılı itibarı ile gelişen ihtiyaçlar ve artan talepler doğrultusunda
        hizmet alanımızı geliştirerek büyüme kararı aldık.
        <br></br>
        <br></br>
        Türkiye de yıllardır birçok nedenden ötürü günlük hayatlarında
        mağduriyet içinde yaşamaya çalışan engelli bireylere daha geniş ve daha
        kolay şartlarda yaşam sunacak ürünler ile hizmet vermeye özen gösterdik.
        Bu konuda araştırmalar ile pazara giren yeni ürünleri son kullanıcısına
        ulaştırmak için çalışmalar yaptık. Ayrıca son kullanıcıların yaşam
        kalitelerini artırmak, daha özgür kılmak için kısaca hayatlarını daha da
        kaliteli bır hale getirmek konusunda önemli bir görevi yerine getirmeyi
        kendimize misyon edindik.
        <br></br>
        <br></br>
        Gelecekte bu ürün yelpazesini daha da genişleterek çok daha uygun
        koşullarda kaliteli ve daha kolay bütçeli çözümler üreterek hedef
        kitlesine destek olmak ve böylelikle misyonunu tamamlamak en büyük
        hedefimizdir.
        <br></br>
        <br></br>
        Bu anlayışla ve temenni ile satış hizmeti verdiğimiz tüm ürünlerin (CE)
        belgesi ve yetkili servis tarafından bakım onarım ve yedek parça hizmeti
        ile desteklendiğini bildiririz.
        <br></br>
        <br></br>
        Sağlıklı ve Özgür Bedenler dileğiyle.
        <br></br>
        Saygılarımızla
      </p>
    </div>
  );
};

export default Kurumsal;
