"""add_introduce

Revision ID: ed1741dedbd7
Revises: 337e372c9631
Create Date: 2021-02-21 16:51:34.685484

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed1741dedbd7'
down_revision = '337e372c9631'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('introduce', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'introduce')
    # ### end Alembic commands ###
