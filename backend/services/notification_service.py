from sqlalchemy.orm import Session

from models.notification_model import UserNotification


def create_notification(
    db: Session,
    user_id,
    title: str,
    message: str,
    notification_type: str = "info",
):
    notification = UserNotification(
        user_id=user_id,
        title=title,
        message=message,
        type=notification_type,
    )
    db.add(notification)
    return notification


def list_notifications(db: Session, user_id):
    return (
        db.query(UserNotification)
        .filter(UserNotification.user_id == user_id)
        .order_by(UserNotification.created_at.desc(), UserNotification.id.desc())
        .limit(50)
        .all()
    )


def mark_notification_read(db: Session, user_id, notification_id: int):
    notification = (
        db.query(UserNotification)
        .filter(
            UserNotification.id == notification_id,
            UserNotification.user_id == user_id,
        )
        .first()
    )
    if notification:
        notification.is_read = True
        db.commit()
    return notification


def mark_all_notifications_read(db: Session, user_id):
    (
        db.query(UserNotification)
        .filter(
            UserNotification.user_id == user_id,
            UserNotification.is_read.is_(False),
        )
        .update({UserNotification.is_read: True}, synchronize_session=False)
    )
    db.commit()


def delete_notification(db: Session, user_id, notification_id: int):
    notification = (
        db.query(UserNotification)
        .filter(
            UserNotification.id == notification_id,
            UserNotification.user_id == user_id,
        )
        .first()
    )
    if notification:
        db.delete(notification)
        db.commit()
    return notification