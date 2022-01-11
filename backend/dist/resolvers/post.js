const updoot = await Updoot.findOne({ where: { postId, userId } });
if (updoot && updoot.value !== realValue) {
    await getConnection().transaction(async (tm) => {
        await tm.query(`
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `, [realValue, postId, userId]);
        await tm.query(`
          update post
          set points = points + $1
          where id = $2
        `, [2 * realValue, postId]);
    });
}
else if (!updoot) {
    await getConnection().transaction(async (tm) => {
        await tm.query(`
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `, [userId, postId, realValue]);
        await tm.query(`
    update post
    set points = points + $1
    where id = $2
      `, [realValue, postId]);
    });
}
//# sourceMappingURL=post.js.map