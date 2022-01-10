"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakePosts1639587055988 = void 0;
class FakePosts1639587055988 {
    async up(queryRunner) {
        await queryRunner.query(`
        insert into post (title, text, "creatorId") values ('One and Only, The (Eneste ene, Den)', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1);
insert into post (title, text, "creatorId") values ('Brides of Dracula', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1);
insert into post (title, text, "creatorId") values ('Tales of Vesperia: The First Strike (Teiruzu obu vesuperia: The first strike)', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1);
insert into post (title, text, "creatorId") values ('Sonic Outlaws', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1);

        `);
    }
    async down(_) {
    }
}
exports.FakePosts1639587055988 = FakePosts1639587055988;
//# sourceMappingURL=1639587055988-FakePosts.js.map