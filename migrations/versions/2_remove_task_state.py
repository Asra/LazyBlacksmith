# flake8: noqa
"""Remove Task State

Revision ID: 2
Revises: 1
Create Date: 2020-02-23 17:56:21.102461

"""
from alembic import op
import sqlalchemy as sa
import lazyblacksmith

# revision identifiers, used by Alembic.
revision = '2'
down_revision = '1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task_state')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task_state',
    sa.Column('task_id', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
    sa.Column('id', sa.BIGINT(), autoincrement=False, nullable=True),
    sa.Column('scope', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('state', sa.VARCHAR(length=20), autoincrement=False, nullable=True),
    sa.Column('start_date', lazyblacksmith.models.utcdatetime.UTCDateTime(timezone=True), autoincrement=False, nullable=True),
    sa.Column('end_date', lazyblacksmith.models.utcdatetime.UTCDateTime(timezone=True), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('task_id', name='task_state_pkey')
    )
    # ### end Alembic commands ###